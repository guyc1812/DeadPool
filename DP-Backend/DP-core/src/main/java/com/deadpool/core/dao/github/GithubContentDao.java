package com.deadpool.core.dao.github;

import org.eclipse.egit.github.core.RepositoryContents;
import java.io.IOException;
import java.util.List;

public interface GithubContentDao {

    List<RepositoryContents> getContents(String repo, String owner, String path) throws IOException;
    List<RepositoryContents> getContents(String repo, String owner, String path, String branch) throws IOException;

    List<RepositoryContents> getContentsAll(String repo, String owner) throws IOException;
    List<RepositoryContents> getContentsAll(String repo, String owner,String branch) throws IOException;

}
