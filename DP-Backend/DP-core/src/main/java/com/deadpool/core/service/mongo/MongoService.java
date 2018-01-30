package com.deadpool.core.service.mongo;

import com.deadpool.core.entity.Doc;
import com.deadpool.core.entity.IndexFlatItem;

import java.util.List;

public interface MongoService {

    void saveIndexToDB(String repo, String indexStr, List<IndexFlatItem> flatIndexItems) throws Exception;
    void removeIndexFromDB(String repo) throws Exception;
    void saveDocToDB(String repo, Doc doc) throws Exception;
    void removeDocFromDB(String repo, String nav) throws Exception;
    void removeAllDocsFromDB(String repo) throws Exception;
    String getDocFromDB(String repo, String nav) throws Exception;
    List<String> getAllDocsFromDB(String repo) throws Exception;

}
