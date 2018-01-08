package com.deadpool.application;

import com.deadpool.core.config.CoreConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = CoreConfig.class)
@TestPropertySource(value = {"classpath:test.properties"})
public class ApplicationTests {

    @Test
    public void contextLoads() {
    }

}
