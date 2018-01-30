package com.deadpool.domain.dao.github;

import com.deadpool.core.dao.github.GithubTreeDao;
import org.eclipse.egit.github.core.Repository;
import org.eclipse.egit.github.core.Tree;
import org.eclipse.egit.github.core.service.DataService;
import org.eclipse.egit.github.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service("githubTreeDao")
public class GithubTreeDaoImpl implements GithubTreeDao {

    private UserService userService;
    private DataService dataService;        //oops

    @Autowired
    public GithubTreeDaoImpl(UserService userService, DataService dataService) {
        this.userService = userService;
        this.dataService = dataService;
    }

    @Override
    public Tree getTree(String owner, String repo, String sha) throws IOException {
        return getTree(owner, repo, sha, false);
    }

    @Override
    public Tree getTree(String owner, String repo, String sha, boolean recursive) throws IOException {
        Repository repository = new Repository();
        repository.setName(repo);
        repository.setOwner(userService.getUser(owner));
        return dataService.getTree(repository, sha, recursive);
    }

}
