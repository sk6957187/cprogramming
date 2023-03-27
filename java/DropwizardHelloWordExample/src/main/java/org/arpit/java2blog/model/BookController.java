package org.arpit.java2blog.model;

import javafx.application.Application;
import javafx.stage.Stage;
import jdk.nashorn.internal.objects.annotations.Getter;

import javax.annotation.PostConstruct;
import java.awt.*;

public class BookController extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        @Path("bookService")
        @Produces(PageAttributes.MediaType.APPLICATION_JSON)
        public class BookController {

            BookService bookService = new BookService();

            @Path("/books")
            @Getter
            public List<Book> getBooks() {
                List<Book> listOfBooks = bookService.getAllBooks();
                return listOfBooks;
            }

            @Path("/book/{id}")
            @Getter
            public Book getBookById(@PathParam(value = "id") int id) {
                return bookService.getBook(id);
            }

            @Consumes(PageAttributes.MediaType.APPLICATION_JSON)
            @Path("/books")
            @PostConstruct
            public Book addBook(Book Book) {
                return bookService.addBook(Book);
            }

            @Path("/books")
            @PUT
            @Consumes(PageAttributes.MediaType.APPLICATION_JSON)
            public Book updateBook(Book Book) {
                return bookService.updateBook(Book);

            }

            @Produces(PageAttributes.MediaType.APPLICATION_JSON)
            @Path("/book/{id}")
            @DELETE
            public void deleteBook(@PathParam(value = "id")int id) {
                bookService.deleteBook(id);

            }
        }

    }
}
