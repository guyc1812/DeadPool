package com.deadpool.core.service.curd.docs;

import com.deadpool.core.entity.IndexFlatItem;

import java.util.List;

public interface DocsService {

    void addDocs(String owner, String repo, String branch) throws Exception;

    void addDoc(String owner, String repo, String branch, IndexFlatItem item) throws Exception;

    void updateDocs(String owner, String repo, String branch) throws Exception;

    void updateDoc(String owner, String repo, String branch, IndexFlatItem item) throws Exception;

    void removeDocs(String repo) throws Exception;

    void removeDoc(String repo, String nav) throws Exception;

    List<String> getDocs(String repo) throws Exception;

    String getDoc(String repo, String nav) throws Exception;


}
