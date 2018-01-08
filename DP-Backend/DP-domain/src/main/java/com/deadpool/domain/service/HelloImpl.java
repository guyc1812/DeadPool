package com.deadpool.domain.service;

import org.springframework.stereotype.Service;

@Service("Hello")
public class HelloImpl implements Hello {

    @Override
    public String hi() {

        return "Hello Spring";

    }

}
