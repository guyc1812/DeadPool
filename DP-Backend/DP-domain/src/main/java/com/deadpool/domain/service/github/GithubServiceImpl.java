package com.deadpool.domain.service.github;

import com.deadpool.core.dao.github.GithubContentDao;
import com.deadpool.core.dao.github.GithubTreeDao;
import com.deadpool.core.entity.Dir;
import com.deadpool.core.entity.Doc;
import com.deadpool.core.entity.Index;
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
public class GithubServiceImpl extends GithubFunctions implements GithubService{


    private final MarkdownService markdownService;

    @Autowired
    public GithubServiceImpl(GithubContentDao githubContentDao, GithubTreeDao githubTreeDao, MarkdownService markdownService) {
        super(githubContentDao,githubTreeDao);
        this.markdownService = markdownService;
    }

    @Override
    public List<Doc> getAllDocs(String owner, String repo, String branch) {

        List<Doc> docs = new LinkedList<>();
        List<RepositoryContents> markdowns = new LinkedList<>();
        Decode decode = new Decode();

        try {
            List<Dir> dirs = getDirSha(owner, repo, branch);
            markdowns = getAllMarkdowns(dirs, owner, repo, branch);
        } catch (Exception e) {
            e.printStackTrace();
        }

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

    @Override
    public String getIndex(String owner, String repo, String branch) {

        try {
            List<RepositoryContents> index = githubContentDao.getContents(repo, owner, "index.json", branch);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


}
