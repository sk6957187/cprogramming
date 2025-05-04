package com.book.view;


import com.book.obj.Book;
import io.dropwizard.views.View;

public class BookView extends View {
    private Book book;
    private String title;
    private String id;
    public BookView(Book book) {
        super("index.ftl");
        this.book = book;
        id = book.getId();
        title = book.getTitle();
    }

    public Book getBook() {
        return book;
    }

    public String getTitle() {
        return title;
    }

    public String getId() {
        return id;
    }
}
