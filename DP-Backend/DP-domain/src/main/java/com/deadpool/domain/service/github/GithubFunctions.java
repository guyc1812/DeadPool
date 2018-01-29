package com.deadpool.domain.service.github;

import com.deadpool.core.dao.github.GithubContentDao;
import com.deadpool.core.dao.github.GithubTreeDao;
import com.deadpool.core.entity.Dir;
import org.eclipse.egit.github.core.RepositoryContents;
import org.eclipse.egit.github.core.Tree;
import org.eclipse.egit.github.core.TreeEntry;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class GithubFunctions {

    private final GithubTreeDao githubTreeDao;
    final GithubContentDao githubContentDao;

    @Autowired
    public GithubFunctions(GithubContentDao githubContentDao, GithubTreeDao githubTreeDao) {
        this.githubContentDao = githubContentDao;
        this.githubTreeDao = githubTreeDao;
    }

    // get all the dirs in the repo(with branch) which contain the sha
    List<Dir> getDirSha(String owner, String repo, String branch) throws Exception {
        List<Dir> dirs = new CopyOnWriteArrayList<>();
        try {
            List<RepositoryContents> contentsList = githubContentDao.getContentsAll(repo, owner, branch);
            contentsList.forEach(item -> {
                if (item.getType().equals("dir")) {
                    dirs.add(new Dir(item.getName(), item.getSha(), item.getPath()));
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return dirs;
    }

    // get all the markdown files
    List<RepositoryContents> getAllMarkdowns(List<Dir> dirsList, String owner, String repo, String branch) throws Exception {
        List<RepositoryContents> mdList = new CopyOnWriteArrayList<>();
        dirsList.parallelStream().forEach((Dir item) -> {
            try {
                Tree trees = githubTreeDao.getTree(owner, repo, item.getSha(), true);
                trees.getTree().parallelStream().forEach((TreeEntry tr) -> {
                    if (tr.getType().equals("blob") && (!tr.getPath().contains("README.md")) && tr.getPath().contains(".md")) {
                        tr.setPath(item.getPath() + "/" + tr.getPath());
                        try {
                            List<RepositoryContents> singleCase = githubContentDao.getContents(repo, owner, tr.getPath(), branch);
                            mdList.addAll(singleCase);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        return mdList;
    }
}
