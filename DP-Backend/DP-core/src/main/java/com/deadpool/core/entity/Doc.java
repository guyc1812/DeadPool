package com.deadpool.core.entity;

public class Doc {

    String avenger;
    String name;
    String path;
    String content;
    String markdown;

    public Doc() {}

    public Doc(String avenger, String name, String path, String content, String markdown) {
        this.avenger = avenger;
        this.name = name;
        this.path = path;
        this.content = content;
        this.markdown = markdown;
    }

    public String getAvenger() {
        return avenger;
    }

    public void setAvenger(String avenger) {
        this.avenger = avenger;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getMarkdown() {
        return markdown;
    }

    public void setMarkdown(String markdown) {
        this.markdown = markdown;
    }
}
