package com.deadpool.core.dao.github;

import org.eclipse.egit.github.core.Tree;

import java.io.IOException;

public interface GithubTreeDao {

    Tree getTree(String owner, String repo, String sha) throws IOException;
    Tree getTree(String owner, String repo, String sha, boolean recursive) throws IOException;

}
