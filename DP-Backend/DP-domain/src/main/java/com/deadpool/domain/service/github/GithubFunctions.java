package com.deadpool.domain.service.github;

import com.deadpool.core.dao.github.GithubContentDao;
import com.deadpool.core.dao.github.GithubTreeDao;
import com.deadpool.core.entity.Dir;
import org.eclipse.egit.github.core.RepositoryContents;
import org.eclipse.egit.github.core.Tree;
import org.eclipse.egit.github.core.TreeEntry;
import org.eclipse.egit.github.core.service.MarkdownService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class GithubFunctions {

    final GithubContentDao githubContentDao;
    private final GithubTreeDao githubTreeDao;
    private final MarkdownService markdownService;

    @Autowired
    public GithubFunctions(GithubContentDao githubContentDao, GithubTreeDao githubTreeDao, MarkdownService markdownService) {
        this.githubContentDao = githubContentDao;
        this.githubTreeDao = githubTreeDao;
        this.markdownService = markdownService;
    }

    // get all the dirs in the repo(with branch) which contain the sha
    List<Dir> getDirSha(String owner, String repo, String branch) throws Exception {
        List<Dir> dirs = new CopyOnWriteArrayList<>();
        try {
            List<RepositoryContents> contentsList = githubContentDao.getContentsAll(owner, repo, branch);
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

    // get all the docs from github
    List<RepositoryContents> getAllDocsFromGithub(List<Dir> dirsList, String owner, String repo, String branch) throws Exception {
        List<RepositoryContents> mdList = new CopyOnWriteArrayList<>();
        dirsList.parallelStream().forEach((Dir item) -> {
            try {
                Tree trees = githubTreeDao.getTree(owner, repo, item.getSha(), true);
                trees.getTree().parallelStream().forEach((TreeEntry tr) -> {
                    if (tr.getType().equals("blob") && (!tr.getPath().contains("README.md")) && tr.getPath().contains(".md")) {
                        tr.setPath(item.getPath() + "/" + tr.getPath());
                        try {
                            List<RepositoryContents> singleCase = githubContentDao.getContents(owner, repo, branch, tr.getPath());
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

    // parse md to html
    String parseToHtml(String decodedContent) {
        String htmlString = "";
        try {
            htmlString = markdownService.getHtml(decodedContent, "markdown");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return htmlString;
    }
}
