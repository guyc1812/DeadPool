package com.deadpool.domain.dao.github;

import com.deadpool.core.dao.github.GithubContentDao;
import org.eclipse.egit.github.core.Repository;
import org.eclipse.egit.github.core.RepositoryContents;
import org.eclipse.egit.github.core.service.ContentsService;
import org.eclipse.egit.github.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service("githubContentDao")
public class GithubContentDaoImpl implements GithubContentDao {

    private UserService userService;
    private ContentsService contentsService;

    @Autowired
    public GithubContentDaoImpl(UserService userService, ContentsService contentsService) {
        this.userService = userService;
        this.contentsService = contentsService;
    }

    @Override
    public List<RepositoryContents> getContentsAll(String repo, String owner) throws IOException {
        return getContents(repo, owner, null, null);
    }

    @Override
    public List<RepositoryContents> getContentsAll(String repo, String owner, String branch) throws IOException {
        return getContents(repo, owner, null, branch);
    }

    @Override
    public List<RepositoryContents> getContents(String repo, String owner, String path) throws IOException {
        return getContents(repo, owner, path, null);
    }

    @Override
    public List<RepositoryContents> getContents(String repo, String owner, String path, String branch) throws IOException {
        Repository repository = new Repository();
        repository.setName(repo);
        repository.setOwner(userService.getUser(owner));
        return contentsService.getContents(repository, path, branch);
    }

}
