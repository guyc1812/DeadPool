package com.deadpool.core.service.curd.index;


import com.deadpool.core.entity.IndexFlatItem;

import java.util.List;

public interface IndexService {

    // add
    void addIndex(String owner, String repo, String branch);

    // delete
    void deleteIndex(String repo);

    // update
    void updateIndex(String owner, String repo, String branch);

    // get
    String getIndex(String repo);
    List<IndexFlatItem> getFlatIndex(String repo);

}
