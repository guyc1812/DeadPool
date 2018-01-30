package com.deadpool.domain.service.curd.docs;

import com.deadpool.core.entity.Doc;
import com.deadpool.core.entity.Index;
import com.deadpool.core.entity.IndexFlatItem;
import com.deadpool.core.service.curd.docs.DocsService;
import com.deadpool.core.service.curd.index.IndexService;
import com.deadpool.core.service.github.GithubService;
import com.deadpool.core.service.mongo.MongoService;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service("docsService")
public class DocsServiceImpl implements DocsService {

    private static final Logger logger = LoggerFactory.getLogger(DocsServiceImpl.class);

    private IndexService indexService;
    private GithubService githubService;
    private MongoService mongoService;

    @Autowired
    public DocsServiceImpl(IndexService indexService, GithubService githubService, MongoService mongoService) {
        this.indexService = indexService;
        this.githubService = githubService;
        this.mongoService = mongoService;
    }

    public void addDocs(String owner, String repo, String branch) throws Exception{
        //update index
        String indexStr = githubService.getIndex(owner, repo, branch);
        Gson gson = new Gson();
        Index index = gson.fromJson(indexStr, Index.class);
        List<IndexFlatItem> flatIndexFromGit = indexService.flatIndex(index);
        flatIndexFromGit.forEach(item -> {
            if (!Objects.equals(item.getNav(), "")) {
                try {
                    IndexFlatItem indexFromBD = indexService.getSingleIndex(repo, item.getNav());
                    if (indexFromBD != null) {
                        if (item.getStatus() < 0) {
                            removeDoc(repo, item.getNav());
                        } else if (item.getStatus() > indexFromBD.getStatus()) {
                            updateDoc(owner, repo, branch, item);
                        }
                    } else {
                        addDoc(owner, repo, branch, item);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        mongoService.removeIndexFromDB(repo);
        mongoService.saveIndexToDB(repo, indexStr, flatIndexFromGit);
    }

    public void addDoc(String owner, String repo, String branch, IndexFlatItem item) throws Exception{
        Doc doc = githubService.getDoc(owner, repo, branch, item.getPath(), item.getTitle(), item.getNav());
        if (doc != null) mongoService.saveDocToDB(repo, doc);
    }

    public void updateDocs(String owner, String repo, String branch) throws Exception{
        addDocs(owner, repo, branch);
    }

    public void updateDoc(String owner, String repo, String branch, IndexFlatItem item) throws Exception{
        mongoService.removeDocFromDB(repo, item.getNav());
        addDoc(owner, repo, branch, item);
    }

    public void removeDocs(String repo) throws Exception{
        mongoService.removeAllDocsFromDB(repo);
    }

    public void removeDoc(String repo, String nav) throws Exception{
        mongoService.removeDocFromDB(repo, nav);
    }

    public List<String> getDocs(String repo) throws Exception{
        return mongoService.getAllDocsFromDB(repo);
    }

    public String getDoc(String repo, String nav) throws Exception{
        return mongoService.getDocFromDB(repo, nav);
    }
}
