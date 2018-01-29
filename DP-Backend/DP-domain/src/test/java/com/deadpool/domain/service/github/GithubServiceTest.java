package com.deadpool.domain.service.github;

import com.deadpool.core.dao.github.GithubContentDao;
import com.deadpool.core.entity.Doc;
import com.deadpool.core.service.github.GithubService;
import com.deadpool.domain.BaseTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.Test;

import java.util.List;

public class GithubServiceTest extends BaseTest {


    @Autowired
    GithubService githubService;

    @Autowired
    GithubContentDao githubContentDao;

    @Test
    public void gitDocs() {
        List<Doc> docs = githubService.getAllDocs("guyc1812", "Tony", "master");
        System.out.println(docs.size());
    }

}
