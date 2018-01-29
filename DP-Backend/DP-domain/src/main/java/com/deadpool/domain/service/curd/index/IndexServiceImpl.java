package com.deadpool.domain.service.curd.index;

import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.service.curd.index.IndexService;
import com.deadpool.core.service.github.GithubService;
import com.google.gson.Gson;
import com.mongodb.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("indexService")
public class IndexServiceImpl extends IndexFunctions implements IndexService {

    private GithubService githubService;

    @Autowired
    public IndexServiceImpl(@Qualifier("MongoClient") MongoClient mongoClient, GithubService githubService) {
        super(mongoClient);
        this.githubService = githubService;
    }

    @Override
    public void addIndex(String owner, String repo, String branch) {
        String indexStr = githubService.getIndex(owner, repo, branch);
        Gson gson = new Gson();
        Index index = gson.fromJson(indexStr, Index.class);
        List<IndexFlatItem> flatIndexItems = flatIndex(index);
        saveIndexToDB(repo, indexStr, flatIndexItems);
    }

    @Override
    public void deleteIndex(String repo) {
        removeIndexFromDB(repo);
    }

    @Override
    public void updateIndex(String owner, String repo, String branch) {
        deleteIndex(repo);
        addIndex(owner, repo, branch);
    }

    @Override
    public String getIndex(String repo) {
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("index");
        BasicDBObject queryObject = new BasicDBObject("category", "index");
        DBObject obj = collection.findOne(queryObject);
        return obj.toString();
    }

    @Override
    public List<IndexFlatItem> getFlatIndex(String repo) {
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("index");
        List<IndexFlatItem> IndexFlatList = new ArrayList<>();
        Gson gson = new Gson();
        BasicDBObject queryObject = new BasicDBObject("category", repo);
        DBCursor cursor = collection.find(queryObject);
        while (cursor.hasNext()) {
            DBObject obj = cursor.next();
            IndexFlatList.add(gson.fromJson(obj.toString(),IndexFlatItem.class));
        }
        return IndexFlatList;
    }
}
