package com.deadpool.domain.service.curd.index;

import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.service.curd.index.IndexService;
import com.deadpool.core.service.mongo.MongoService;
import com.deadpool.domain.BaseTest;
import com.mongodb.MongoClient;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.List;

public class IndexServiceTest extends BaseTest {

    @Autowired
    IndexService indexService;

    @Autowired
    @Qualifier(value = "MongoClient")
    MongoClient mongoClient;

    @Autowired
    MongoService mongoService;


    @Test
    public void addIndex() {
        try {
            indexService.addIndex("guyc1812", "Stark", "master");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void deleteIndex() {
        try {
            indexService.removeIndex("Stark");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void updateIndex() {
        try {
            indexService.updateIndex("guyc1812", "Stark", "master");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void getIndex() {
        String index = null;
        try {
            index = indexService.getIndex("Stark");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(index);
    }

    @Test
    public void getFlatIndex() {
        List<IndexFlatItem> index = null;
        try {
            index = indexService.getFlatIndex("Stark");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(index);
    }

}
