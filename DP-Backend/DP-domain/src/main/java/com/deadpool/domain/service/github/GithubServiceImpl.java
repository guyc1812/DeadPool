package com.deadpool.domain.service.github;

import com.deadpool.core.dao.github.GithubContentDao;
import com.deadpool.core.dao.github.GithubTreeDao;
import com.deadpool.core.entity.Dir;
import com.deadpool.core.entity.Doc;
import com.deadpool.core.service.github.GithubService;
import com.deadpool.domain.service.util.Decode;
import org.eclipse.egit.github.core.RepositoryContents;
import org.eclipse.egit.github.core.Tree;
import org.eclipse.egit.github.core.TreeEntry;
import org.eclipse.egit.github.core.service.MarkdownService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service("githubService")
public class GithubServiceImpl implements GithubService{

    private final GithubContentDao githubContentDao;
    private final GithubTreeDao githubTreeDao;
    private final MarkdownService markdownService;

    @Autowired
    public GithubServiceImpl(GithubContentDao githubContentDao, GithubTreeDao githubTreeDao, MarkdownService markdownService) {
        this.githubContentDao = githubContentDao;
        this.githubTreeDao = githubTreeDao;
        this.markdownService = markdownService;
    }

    @Override
    public List<Doc> getDocs(String owner, String repo, String branch) {

        List<Doc> docs = new LinkedList<>();
        List<RepositoryContents> markdowns = new LinkedList<>();

        try {
            List<Dir> dirs = getDirSha(owner, repo, branch);
            markdowns = getAllMarkdowns(dirs, owner, repo, branch);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Decode decode = new Decode();
        markdowns.forEach(md -> {
            String decodedContent = decode.decodeContentUTF(md.getContent());
            String htmlString = "";
            try {
                htmlString = markdownService.getHtml(decodedContent, "markdown");
            } catch (IOException e) {
                e.printStackTrace();
            }
            Doc doc = Doc.builder()
                         .category(repo)
                         .title(md.getName())
                         .path(md.getPath())
                         .content(decodedContent)
                         .markdown(htmlString)
                         .build();
            docs.add(doc);
        });

        return docs;

    }

    // get all the dirs in the repo(with branch) which contain the sha
    private List<Dir> getDirSha(String owner, String repo, String branch) throws Exception {
        List<Dir> dirs = new CopyOnWriteArrayList<>();
        try {
            List<RepositoryContents> contentsList = githubContentDao.getContentsAll(repo, owner, branch);
            contentsList.forEach(item -> {
                if (item.getType().equals("dir")) {
                    dirs.add(new Dir(item.getName(), item.getSha(), item.getPath()));
                }
            });
        } catch (Exception e) {
            return null;
        }
        return dirs;
    }

    // get all the markdown files
    private List<RepositoryContents> getAllMarkdowns(List<Dir> dirsList, String owner, String repo, String branch) throws Exception {
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
