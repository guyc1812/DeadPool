package com.deadpool.domain.service.curd.index;

import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.entity.IndexItem;
import com.deadpool.core.service.curd.index.IndexService;
import com.deadpool.core.service.github.GithubService;
import com.deadpool.core.service.mongo.MongoService;
import com.google.gson.Gson;
import com.mongodb.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Service("indexService")
public class IndexServiceImpl extends IndexFunctions implements IndexService {

    private static final Logger logger = LoggerFactory.getLogger(IndexServiceImpl.class);

    private MongoClient mongoClient;

    @Autowired
    public IndexServiceImpl(GithubService githubService, MongoService mongoService, @Qualifier("MongoClient") MongoClient mongoClient) {
        super(githubService, mongoService);
        this.mongoClient = mongoClient;
    }

    @Override
    public List<IndexFlatItem> flatIndex(Index index) throws Exception{
        Assert.notNull(index,"index to be flatted can not bu null");
        List<IndexFlatItem> flatIndexItems = new ArrayList<>();
        List<IndexItem> indexItems = index.getIndex();
        indexItems.forEach(item -> addIndexItem(flatIndexItems, item));
        return flatIndexItems;
    }

    @Override
    public boolean addIndex(String owner, String repo, String branch) throws Exception{
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Add index ...");
        String indexStr = githubService.getIndex(owner, repo, branch);
        Gson gson = new Gson();
        Index index = gson.fromJson(indexStr, Index.class);
        List<IndexFlatItem> flatIndexItems = flatIndex(index);
        mongoService.saveIndexToDB(repo, indexStr, flatIndexItems);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Add index done");
        return true;
    }

    @Override
    public boolean removeIndex(String repo) throws Exception{
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Remove index ...");
        mongoService.removeIndexFromDB(repo);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Remove index done");
        return true;
    }

    @Override
    public boolean updateIndex(String owner, String repo, String branch)throws Exception{
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Update index ...");
        removeIndex(repo);
        addIndex(owner, repo, branch);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Update index done");
        return true;
    }

    @Override
    public String getIndex(String repo) throws Exception{
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("index");
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get index ...");
        BasicDBObject queryObject = new BasicDBObject("category", "index");
        DBObject obj = collection.findOne(queryObject);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get index done");
        if (obj != null) {
            return obj.toString();
        } else {
            return null;
        }
    }

    @Override
    public List<IndexFlatItem> getFlatIndex(String repo)throws Exception{
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("index");
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get flat index ...");
        List<IndexFlatItem> IndexFlatList = new ArrayList<>();
        Gson gson = new Gson();
        BasicDBObject queryObject = new BasicDBObject("category", repo);
        DBCursor cursor = collection.find(queryObject);
        while (cursor.hasNext()) {
            DBObject obj = cursor.next();
            IndexFlatList.add(gson.fromJson(obj.toString(), IndexFlatItem.class));
        }
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get flat index done");
        return IndexFlatList;
    }

    @Override
    public IndexFlatItem getSingleIndex(String repo, String nav) throws Exception{
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("docs");
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get single index ...");
        BasicDBObject queryObject = new BasicDBObject("nav", nav);
        DBObject obj = collection.findOne(queryObject);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get single index done");
        if (obj != null) {
            return new Gson().fromJson(obj.toString(), IndexFlatItem.class);
        } else {
            return null;
        }
    }
}
