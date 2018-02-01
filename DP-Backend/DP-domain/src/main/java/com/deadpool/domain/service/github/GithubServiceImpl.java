package com.deadpool.domain.service.github;

import com.deadpool.core.dao.github.GithubContentDao;
import com.deadpool.core.dao.github.GithubTreeDao;
import com.deadpool.core.entity.Dir;
import com.deadpool.core.entity.Doc;
import com.deadpool.core.service.github.GithubService;
import com.deadpool.domain.service.util.Decode;
import org.eclipse.egit.github.core.RepositoryContents;
import org.eclipse.egit.github.core.service.MarkdownService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@Service("githubService")
public class GithubServiceImpl extends GithubFunctions implements GithubService {

    private static final Logger logger = LoggerFactory.getLogger(GithubServiceImpl.class);

    @Autowired
    public GithubServiceImpl(GithubContentDao githubContentDao, GithubTreeDao githubTreeDao, MarkdownService markdownService) {
        super(githubContentDao, githubTreeDao, markdownService);
    }

    @Override
    public String getIndex(String owner, String repo, String branch) throws Exception {
        String decodedIndex;
        try {
            logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get index.json from github ...");
            List<RepositoryContents> index = githubContentDao.getContents(owner, repo, branch, "index.json");
            Decode decode = new Decode();
            decodedIndex = decode.decodeContentUTF(index.get(0).getContent());
            logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get index.json from github done");
            return decodedIndex;
        } catch (Exception e) {
            logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get index.json from github ERROR");
            throw e;
        }
    }

    @Override
    public Doc getDoc(String owner, String repo, String branch, String path, String title, String nav) throws Exception {
        List<RepositoryContents> gitDocs;
        Decode decode = new Decode();
        try {
            logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get doc("+nav+") from github ...");
            gitDocs = githubContentDao.getContents(owner, repo, branch, path);
            if(gitDocs.size()==0) return null;
            RepositoryContents theDoc = gitDocs.get(0);
            String decodedContent = decode.decodeContentUTF(theDoc.getContent());
            logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get doc("+nav+") from github done");
            return Doc.builder()
                    .category(repo)
                    .title(title)
                    .path(theDoc.getPath())
                    .nav(nav)
                    .content(parseToHtml(decodedContent))
                    .build();
        } catch (Exception e) {
            logger.info(" \n\t\t\t [guyc1812/" + repo + "] Get doc("+nav+") from github ERROR");
            throw e;
        }
    }

}
