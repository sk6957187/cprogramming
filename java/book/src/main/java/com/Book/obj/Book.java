package com.Book.obj;

public class Book {
    int id;
    String title;
    long pages;

    public Book(int id, String title, long pages) {
        super();
        this.id = id;
        this.title = title;
        this.pages = pages;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public long getPages() {
        return pages;
    }
    public void setPages(long pages) {
        this.pages = pages;
    }
}
