package com.deadpool.core.service.github;

import com.deadpool.core.entity.Doc;
import com.deadpool.core.entity.Index;

import java.util.List;

public interface GithubService {
    List<Doc> getAllDocs(String owner, String repo, String branch);
    String getIndex(String owner, String repo, String branch);
}
