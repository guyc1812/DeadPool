package com.deadpool.domain.service.github;

import com.deadpool.core.dao.github.GithubContentDao;
import com.deadpool.core.entity.Doc;
import com.deadpool.core.service.github.GithubService;
import com.deadpool.domain.BaseTest;
import com.deadpool.domain.service.util.Decode;
import org.eclipse.egit.github.core.RepositoryContents;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

public class GithubServiceTest extends BaseTest {


    @Autowired
    GithubService githubService;

    @Autowired
    GithubContentDao githubContentDao;

    @Test
    public void getSingleContent(){
        List<RepositoryContents> gitDocs = new LinkedList<>();
        Decode decode = new Decode();
        try {
            gitDocs = githubContentDao.getContents("guyc1812", "Stark", "master", "src/main/java/com/avengers/Stark/JavaBasic/jvm/docs/Jvm.md");
        } catch (IOException e) {
            e.printStackTrace();
        }
        RepositoryContents theDoc = gitDocs.get(0);
        String decodedContent = decode.decodeContentUTF(theDoc.getContent());

        Doc doc = Doc.builder()
                .category("Stark")
                .title(theDoc.getName())
                .path(theDoc.getPath())
                .content(decodedContent)
                .build();

        System.out.println(doc);
    }

}
