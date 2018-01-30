package com.deadpool.core.service.github;

import com.deadpool.core.entity.Doc;

public interface GithubService {
    String getIndex(String owner, String repo, String branch) throws Exception;
    Doc getDoc(String owner, String repo, String branch, String path, String title, String nav) throws Exception;
}
