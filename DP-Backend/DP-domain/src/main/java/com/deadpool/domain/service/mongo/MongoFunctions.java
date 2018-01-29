package com.deadpool.domain.service.mongo;

import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.entity.IndexItem;
import com.deadpool.core.service.github.GithubService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class MongoFunctions {

    GithubService githubService;

    @Autowired
    public MongoFunctions(GithubService githubService){
        this.githubService = githubService;
    }


}
