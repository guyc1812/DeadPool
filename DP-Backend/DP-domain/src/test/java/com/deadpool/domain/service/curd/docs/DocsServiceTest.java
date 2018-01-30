package com.deadpool.domain.service.curd.docs;

import com.deadpool.core.service.curd.docs.DocsService;
import com.deadpool.domain.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class DocsServiceTest extends BaseTest {

    @Autowired
    DocsService docsService;

    @Test
    public void addDocs() {
        try {
            docsService.addDocs("guyc1812", "Stark", "master");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void removeDoc() {
        try {
            docsService.removeDoc("Stark", "JVM-JavaVirtualMachine");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
