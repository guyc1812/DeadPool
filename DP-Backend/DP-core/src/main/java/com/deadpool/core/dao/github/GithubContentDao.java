package com.deadpool.core.dao.github;

import org.eclipse.egit.github.core.RepositoryContents;
import java.io.IOException;
import java.util.List;

public interface GithubContentDao {

    List<RepositoryContents> getContents(String owner, String repo, String path) throws IOException;
    List<RepositoryContents> getContents(String owner, String repo, String branch, String path) throws IOException;

    List<RepositoryContents> getContentsAll(String owner, String repo) throws IOException;
    List<RepositoryContents> getContentsAll(String owner, String repo, String branch) throws IOException;

}
