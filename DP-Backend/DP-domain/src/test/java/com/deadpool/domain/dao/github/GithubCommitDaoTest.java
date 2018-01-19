package com.deadpool.domain.dao.github;

import com.deadpool.core.dao.github.GithubCommitDao;
import com.deadpool.domain.BaseTest;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

public class GithubCommitDaoTest extends BaseTest {

    @Value("${owner}")
    public String owner;

    @Value("${repo}")
    public String repo;

    @Value("${repo.target}")
    public String path;

    @Autowired
    GithubCommitDao githubCommitDao;

    @Test
    public void getCommit() throws Exception {
        Assert.assertTrue(githubCommitDao.getCommits(repo, owner, path).size() > 0);
    }

    @Test
    public void getCommitAll() throws Exception {
        Assert.assertTrue(githubCommitDao.getCommitsAll(repo, owner).size() > 0);
    }


}
