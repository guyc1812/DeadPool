package com.deadpool.domain.service.curd.index;

import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.entity.IndexItem;
import com.deadpool.core.service.github.GithubService;
import com.deadpool.core.service.mongo.MongoService;
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

    GithubService githubService;
    MongoService mongoService;

    @Autowired
    public IndexFunctions(GithubService githubService, MongoService mongoService) {
        this.githubService = githubService;
        this.mongoService = mongoService;
    }

    void addIndexItem(List<IndexFlatItem> flatIndexItems, IndexItem indexItem) {
        flatIndexItems.add(new IndexFlatItem(indexItem));
        if (!indexItem.getItems().isEmpty()) {
            indexItem.getItems().forEach(item -> addIndexItem(flatIndexItems, item));
        }
    }

}
