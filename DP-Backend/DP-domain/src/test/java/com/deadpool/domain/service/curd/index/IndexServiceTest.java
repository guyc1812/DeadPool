package com.deadpool.domain.service.curd.index;

import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.service.curd.index.IndexService;
import com.deadpool.core.service.mongo.MongoService;
import com.deadpool.domain.BaseTest;
import com.google.gson.Gson;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.util.JSON;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class IndexServiceTest extends BaseTest {

    @Autowired
    IndexService indexService;

    @Autowired
    @Qualifier(value = "MongoClient")
    MongoClient mongoClient;

    @Autowired
    MongoService mongoService;


    @Test
    public void saveIndex() {

        IndexFunctions indexFunctions = new IndexFunctions(mongoClient);

        String result = "";
        try {
            result = new String(Files.readAllBytes(Paths.get("index.json")), StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Gson gson = new Gson();
        Index index = gson.fromJson(result, Index.class);
        List<IndexFlatItem> flatIndexItems = indexFunctions.flatIndex(index);

        DB db = mongoClient.getDB("javaBasic");
        DBCollection collection = db.getCollection("index");

        DBObject indexObject = (DBObject) JSON.parse(result);
        collection.insert(indexObject);

        flatIndexItems.forEach(item -> {
            DBObject flatIndexItem = (DBObject) JSON.parse(gson.toJson(item));
            collection.insert(flatIndexItem);
        });

    }

    @Test
    public void deleteIndex() {
        indexService.deleteIndex("javaBasic");
    }

    @Test
    public void updateIndex() {
        indexService.deleteIndex("javaBasic");
        saveIndex();
    }

    @Test
    public void getIndex() {
        String index = indexService.getIndex("javaBasic");
        System.out.println(index);
    }

    @Test
    public void getFlatIndex() {
        List<IndexFlatItem> index = indexService.getFlatIndex("javaBasic");
        System.out.println(index);
    }

}
