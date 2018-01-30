package com.deadpool.domain.dao.github;

import com.deadpool.core.dao.github.GithubCommitDao;
import org.eclipse.egit.github.core.Repository;
import org.eclipse.egit.github.core.RepositoryCommit;
import org.eclipse.egit.github.core.service.CommitService;
import org.eclipse.egit.github.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service("githubCommitDao")
public class GithubCommitDaoImpl implements GithubCommitDao {

    private CommitService commitService;
    private UserService userService;

    @Autowired
    public GithubCommitDaoImpl(CommitService commitService, UserService userService) {
        this.commitService = commitService;
        this.userService = userService;
    }

    @Override
    public List<RepositoryCommit> getAllCommits(String owner, String repo) throws IOException {
        return getCommits(owner, repo, null, null);
    }

    @Override
    public List<RepositoryCommit> getAllCommits(String owner, String repo, String branch) throws IOException {
        return getCommits(owner, repo, branch, null);
    }

    @Override
    public List<RepositoryCommit> getCommits(String owner, String repo, String path) throws IOException {
        return getCommits(owner, repo, null, path);
    }

    @Override
    public List<RepositoryCommit> getCommits(String owner, String repo, String branch, String path) throws IOException {
        Repository repository = new Repository();
        repository.setName(repo);
        repository.setOwner(userService.getUser(owner));
        return commitService.getCommits(repository, branch, path);
    }

}
