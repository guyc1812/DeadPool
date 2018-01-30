package com.deadpool.domain.service.mongo;

import com.deadpool.core.service.github.GithubService;
import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public class MongoFunctions {

    MongoClient mongoClient;

    @Autowired
    public MongoFunctions(@Qualifier("MongoClient") MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }
}
