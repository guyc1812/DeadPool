package com.deadpool.application.controller;

import com.deadpool.core.entity.ResponseTransfer;
import com.deadpool.core.service.curd.docs.DocsService;
import com.deadpool.core.service.curd.index.IndexService;
import com.mongodb.util.JSON;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Query Controller", description = "Query Index and Docs")
public class QueryController {

    private IndexService indexService;
    private DocsService docsService;

    @Autowired
    public QueryController(IndexService indexService, DocsService docsService) {
        this.indexService = indexService;
        this.docsService = docsService;
    }

    /* sider list */
    @RequestMapping(value = "/siderList", method = RequestMethod.GET)
    public ResponseTransfer getSiderList(@RequestParam("category") String category) {
        try {
            String siderList = indexService.getIndex(category);
            return new ResponseTransfer("ok", siderList);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", null);
        }
    }

    /* get all notes of a single category */
    @RequestMapping(value = "/docs", method = RequestMethod.GET)
    public ResponseTransfer getNotes(@RequestParam("category") String category) {
        try {
            List<String> docsList = docsService.getDocs(category);
            return new ResponseTransfer("ok", JSON.serialize(docsList));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", null);
        }
    }

    /* get the note of a specific path */
    @RequestMapping(value = "/doc", method = RequestMethod.GET)
    public ResponseTransfer getNote(@RequestParam("category") String category,
                                    @RequestParam("nav") String nav) {
        try {
            String doc = docsService.getDoc(category,nav);
            return new ResponseTransfer("ok", doc);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", null);
        }
    }

}
