package com.deadpool.domain.service.mongo;

import com.deadpool.core.service.github.GithubService;
import com.deadpool.core.service.mongo.MongoService;
import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("mongoService")
public class MongoServiceImpl extends MongoFunctions implements MongoService {

    private GithubService githubService;
    private MongoClient mongoClient;

    @Autowired
    public MongoServiceImpl(GithubService githubService, @Qualifier("MongoClient") MongoClient mongoClient) {
        super(githubService);
        this.mongoClient = mongoClient;
    }


}
