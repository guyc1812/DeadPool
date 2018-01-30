package com.deadpool.core.dao.github;

import org.eclipse.egit.github.core.RepositoryCommit;

import java.io.IOException;
import java.util.List;

public interface GithubCommitDao {

    List<RepositoryCommit> getCommits(String repo, String owner, String path) throws IOException;
    List<RepositoryCommit> getCommits(String repo, String owner, String branch, String path) throws IOException;

    List<RepositoryCommit> getAllCommits(String repo, String owner) throws IOException;
    List<RepositoryCommit> getAllCommits(String repo, String owner, String branch) throws IOException;

}
