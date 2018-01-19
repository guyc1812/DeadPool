package com.deadpool.core.entity;

/**
 * Created by yucgu on 2017/4/20.
 */
public class Dir {

    private String name;
    private String sha;
    private String path;

    public Dir(String name, String sha, String path) {
        this.name = name;
        this.sha = sha;
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSha() {
        return sha;
    }

    public void setSha(String sha) {
        this.sha = sha;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
