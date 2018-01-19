package com.deadpool.core.service.github;

import com.deadpool.core.entity.Doc;

import java.util.List;

public interface GithubService {
    List<Doc> getDocs(String owner, String repo, String branch);
}
