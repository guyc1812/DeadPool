package com.deadpool.domain.service.curd.index;

import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.entity.IndexItem;
import com.google.gson.Gson;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

import com.mongodb.MongoClient;
import com.mongodb.util.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.ArrayList;
import java.util.List;

public class IndexFunctions {

    MongoClient mongoClient;

    @Autowired
    public IndexFunctions(@Qualifier("MongoClient") MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    // public for unit test
    List<IndexFlatItem> flatIndex(Index index) {
        List<IndexFlatItem> flatIndexItems = new ArrayList<>();
        List<IndexItem> indexItems = index.getIndex();
        indexItems.forEach(item -> addIndexItem(flatIndexItems, item));
        return flatIndexItems;
    }

    private void addIndexItem(List<IndexFlatItem> flatIndexItems, IndexItem indexItem) {
        flatIndexItems.add(new IndexFlatItem(indexItem));
        if (!indexItem.getItems().isEmpty()) {
            indexItem.getItems().forEach(item -> addIndexItem(flatIndexItems, item));
        }
    }

    void saveIndexToDB(String repo, String indexStr, List<IndexFlatItem> flatIndexItems) {
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("index");
        Gson gson = new Gson();
        // save index
        DBObject indexObject = (DBObject) JSON.parse(indexStr);
        collection.insert(indexObject);
        // save flat index
        flatIndexItems.forEach(item -> {
            DBObject flatIndexItem = (DBObject) JSON.parse(gson.toJson(item));
            collection.insert(flatIndexItem);
        });
    }

    void removeIndexFromDB(String repo) {
        DB db = mongoClient.getDB(repo);
        if (db.collectionExists("index")) db.getCollection("index").drop();
    }

}
