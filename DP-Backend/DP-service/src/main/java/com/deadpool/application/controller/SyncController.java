package com.deadpool.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api")
public class SyncController {

    @Autowired
    public SyncController() { }


    /* ADD */
    @RequestMapping(value = "/allNotes", method = RequestMethod.POST)
    public String addAllNotes() {
        return null;
    }

    /* ADD */
    @RequestMapping(value = "/notes", method = RequestMethod.POST)
    public String addNotes(@RequestParam("category") String category) {
        return null;
    }

    /* ADD */
    @RequestMapping(value = "/note", method = RequestMethod.POST)
    public String addNote(@RequestParam("category") String category,
                          @RequestParam("category") String title) {
        return null;
    }


    /* UPDATE */
    @RequestMapping(value = "/allNotes", method = RequestMethod.PUT)
    public String updateAllNotes() {
        return null;
    }

    /* UPDATE */
    @RequestMapping(value = "/notes", method = RequestMethod.PUT)
    public String updateNotes(@RequestParam("category") String category) {
        return null;
    }

    /* UPDATE */
    @RequestMapping(value = "/note", method = RequestMethod.PUT)
    public String updateNote(@RequestParam("category") String category,
                             @RequestParam("category") String title) {
        return null;
    }


    /* DELETE */
    @RequestMapping(value = "/allNotes", method = RequestMethod.DELETE)
    public String deleteAllNotes() {
        return null;
    }

    /* DELETE */
    @RequestMapping(value = "/notes", method = RequestMethod.DELETE)
    public String deleteNotes(@RequestParam("category") String category) {
        return null;
    }

    /* DELETE */
    @RequestMapping(value = "/note", method = RequestMethod.DELETE)
    public String deleteNote(@RequestParam("category") String category,
                             @RequestParam("category") String title) {
        return null;
    }


}
