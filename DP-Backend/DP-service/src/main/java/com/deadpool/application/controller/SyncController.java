package com.deadpool.application.controller;

import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.entity.ResponseTransfer;
import com.deadpool.core.service.curd.docs.DocsService;
import com.deadpool.core.service.curd.index.IndexService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/DP")
@Api(value = "Sync Controller", description = "CURD")
public class SyncController {

    private IndexService indexService;
    private DocsService docsService;

    @Autowired
    public SyncController(IndexService indexService, DocsService docsService) {
        this.indexService = indexService;
        this.docsService = docsService;
    }

    /* ADD */
    @RequestMapping(value = "/docs", method = RequestMethod.POST)
    public ResponseTransfer addNotes(@RequestParam("category") String category) {
        try {
            docsService.addDocs("guyc1812", category, "master");
            return new ResponseTransfer("ok", "adding done");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", "adding error");
        }
    }

    /* ADD */
    @RequestMapping(value = "/docHello", method = RequestMethod.POST)
    public ResponseTransfer addDocHello(@RequestParam("category") String category) {
        try {
            docsService.addDoc("guyc1812", category, "master", new IndexFlatItem(category, "Hello", "README.md", "hello", 310));
            return new ResponseTransfer("ok", "adding done");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", "adding error");
        }
    }


    /* UPDATE */
    @RequestMapping(value = "/docs", method = RequestMethod.PUT)
    public ResponseTransfer updateNotes(@RequestParam("category") String category) {
        try {
            docsService.updateDocs("guyc1812", category, "master");
            return new ResponseTransfer("ok", "updating done");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", "updating error");
        }
    }

    /* UPDATE */
    @RequestMapping(value = "/doc", method = RequestMethod.PUT)
    public ResponseTransfer updateNotes(
            @RequestParam("category") String category,
            @RequestParam("title") String title,
            @RequestParam("path") String path,
            @RequestParam("nav") String nav) {
        try {
            docsService.updateDoc("guyc1812", category, "master", new IndexFlatItem(category, title, path, nav, 0));
            return new ResponseTransfer("ok", "updating done");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", "updating error");
        }
    }

    @RequestMapping(value = "/docHello", method = RequestMethod.PUT)
    public ResponseTransfer updateDocHello(@RequestParam("category") String category) {
        try {
            docsService.updateDoc("guyc1812", category, "master", new IndexFlatItem(category, "Hello", "README.md", "hello", 310));
            return new ResponseTransfer("ok", "adding done");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", "adding error");
        }
    }


    /* DELETE */
    @RequestMapping(value = "/docs", method = RequestMethod.DELETE)
    public ResponseTransfer deleteNotes(@RequestParam("category") String category) {
        try {
            docsService.removeDocs(category);
            return new ResponseTransfer("ok", "deleting done");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", "deleting error");
        }
    }

    /* DELETE */
    @RequestMapping(value = "/doc", method = RequestMethod.DELETE)
    public ResponseTransfer deleteNote(
            @RequestParam("category") String category,
            @RequestParam("nav") String nav) {
        try {
            docsService.removeDoc(category, nav);
            return new ResponseTransfer("ok", "deleting done");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseTransfer("error", "deleting error");
        }
    }


}
