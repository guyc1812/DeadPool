package com.deadpool.domain.service.mongo;

import com.deadpool.core.entity.Doc;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.service.mongo.MongoService;
import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.util.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("mongoService")
public class MongoServiceImpl extends MongoFunctions implements MongoService {

    private static final Logger logger = LoggerFactory.getLogger(MongoServiceImpl.class);

    @Autowired
    public MongoServiceImpl(@Qualifier("MongoClient") MongoClient mongoClient) {
        super(mongoClient);
    }

    // save index
    @Override
    public void saveIndexToDB(String repo, String indexStr, List<IndexFlatItem> flatIndexItems) throws Exception{
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("index");
        Gson gson = new Gson();
        // save index
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Save index.json to DB ...");
        DBObject indexObject = (DBObject) JSON.parse(indexStr);
        collection.insert(indexObject);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Save index.json to DB done");
        // save flat index
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Save flat index to DB ...");
        flatIndexItems.forEach(item -> {
            DBObject flatIndexItem = (DBObject) JSON.parse(gson.toJson(item));
            collection.insert(flatIndexItem);
        });
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Save flat index to DB done");
    }

    // remove index
    @Override
    public void removeIndexFromDB(String repo) throws Exception {
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Remove index from DB ...");
        // remove index from DB(repo)
        DB db = mongoClient.getDB(repo);
        if (db.collectionExists("index")) db.getCollection("index").drop();
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Remove index from DB done");
    }

    // save doc
    @Override
    public void saveDocToDB(String repo, Doc doc) throws Exception {
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("docs");
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Save doc("+doc.getNav()+") to DB ...");
        DBObject docObject = (DBObject) JSON.parse(new Gson().toJson(doc));
        collection.insert(docObject);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Save doc("+doc.getNav()+") to DB done");
    }

    // remove doc
    @Override
    public void removeDocFromDB(String repo, String nav) throws Exception {
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("docs");
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Remove doc("+nav+") from DB ...");
        BasicDBObject queryObject = new BasicDBObject("nav", nav);
        collection.remove(queryObject);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Remove doc("+nav+") from DB done");
    }

    // remove docs
    @Override
    public void removeAllDocsFromDB(String repo) throws Exception {
        DB db = mongoClient.getDB(repo);
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Remove all docs from DB ...");
        if (db.collectionExists("docs")) db.getCollection("docs").drop();
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Remove all docs from DB done");
    }

    // get doc
    @Override
    public String getDocFromDB(String repo, String nav) throws Exception {
        DB db = mongoClient.getDB(repo);
        DBCollection collection = db.getCollection("docs");
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get doc("+nav+") from DB ...");
        BasicDBObject queryObject = new BasicDBObject("nav", nav);
        DBObject obj = collection.findOne(queryObject);
        if(obj!=null){
            logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get doc("+nav+") from DB done");
            return obj.toString();
        }else {
            logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get doc("+nav+") is NULL");
            return null;
        }

    }

    // get docs
    @Override
    public List<String> getAllDocsFromDB(String repo) throws Exception {
        DB db = mongoClient.getDB(repo);
        List<String> docsList = new ArrayList<>();
        DBCollection collection = db.getCollection("docs");
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get all docs from DB ...");
        DBCursor cursor = collection.find();
        while (cursor.hasNext()) {
            DBObject obj = cursor.next();
            docsList.add(obj.toString());
        }
        logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get all docs from DB done");
        return docsList;
    }

}
