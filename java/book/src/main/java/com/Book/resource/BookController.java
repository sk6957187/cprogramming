package com.Book.resource;

import com.Book.obj.Book;
import com.Book.service.BookService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("book-service")
@Produces(MediaType.APPLICATION_JSON)
public class BookController {

    BookService bookService = new BookService();

    @Path("/books")
    @GET
    public List<Book> getBooks() {
        List<Book> listOfBooks = bookService.getAllBooks();
        return listOfBooks;
    }

    @Path("/book/{id}")
    @GET
    public Book getBookById(@PathParam(value = "id") int id) {
        System.out.println(id);
        Book result = bookService.getBook(id);
        if (result == null) {
            result = new Book(id, "Book Not Found", 0);
        }
        return result;
    }

    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/books")
    @POST
    public Book addBook(Book Book) {
        return bookService.addBook(Book);
    }

    @Path("/books")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Book updateBook(Book Book) {
        return bookService.updateBook(Book);

    }

    @Produces(MediaType.APPLICATION_JSON)
    @Path("/book/{id}")
    @DELETE
    public void deleteBook(@PathParam(value = "id")int id) {
        bookService.deleteBook(id);

    }
}
