package com.Book.obj;

public class Book {
    String id;
    String title;
    String pages;

    public Book(String id, String title, String pages) {
        super();
        this.id = id;
        this.title = title;
        this.pages = pages;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getPages() {
        return pages;
    }
    public void setPages(String pages) {
        this.pages = pages;
    }
}
