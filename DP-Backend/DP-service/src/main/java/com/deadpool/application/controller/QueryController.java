package com.deadpool.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QueryController {

    @Autowired
    public QueryController() { }


    /* sider lists */
    @RequestMapping(value = "/siderLists", method = RequestMethod.GET)
    public String getAllSiderLists() {
        return null;
    }

    /* sider list */
    @RequestMapping(value = "/siderList", method = RequestMethod.GET)
    public String getSiderList(@RequestParam("category") String category) {
        return null;
    }


    /* get all notes of all categories */
    @RequestMapping(value = "/allNotes", method = RequestMethod.GET)
    public String getAllNotes() {
        return null;
    }

    /* get all notes of a single category */
    @RequestMapping(value = "/notes", method = RequestMethod.GET)
    public String getNotes(@RequestParam("category") String category) {
        return null;
    }

    /* get the note of a specific path */
    @RequestMapping(value = "/note", method = RequestMethod.GET)
    public String getNote(@RequestParam("category") String category,
                          @RequestParam("category") String title) {
        return null;
    }

}
