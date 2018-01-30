package com.deadpool.core.service.curd.index;


import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;

import java.util.List;

public interface IndexService {

    // flat
    List<IndexFlatItem> flatIndex(Index index) throws Exception;

    // add
    boolean addIndex(String owner, String repo, String branch) throws Exception;

    // delete
    boolean removeIndex(String repo) throws Exception;

    // update
    boolean updateIndex(String owner, String repo, String branch) throws Exception;

    // get
    String getIndex(String repo) throws Exception;

    List<IndexFlatItem> getFlatIndex(String repo) throws Exception;

    IndexFlatItem getSingleIndex(String repo, String nav) throws Exception;

}
