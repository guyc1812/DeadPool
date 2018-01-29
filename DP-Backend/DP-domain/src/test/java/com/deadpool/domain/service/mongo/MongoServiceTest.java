package com.deadpool.domain.service.mongo;


import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.entity.IndexItem;
import com.deadpool.core.service.mongo.MongoService;
import com.deadpool.domain.BaseTest;
import com.deadpool.domain.service.curd.index.IndexFunctions;
import com.google.gson.Gson;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.util.JSON;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class MongoServiceTest extends BaseTest {


}
