package com.deadpool.application.controller;

import com.deadpool.domain.service.Hello;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final Hello hello;

    @Autowired
    public ApiController(Hello hello) {
        this.hello = hello;
    }

    @RequestMapping("/hello")
    public String searchData(HttpServletRequest request) {

        return hello.hi();

    }
}
