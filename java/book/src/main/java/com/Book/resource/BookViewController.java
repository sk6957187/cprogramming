package com.book.resource;

import com.book.service.BookService;
import com.book.view.BookView;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/view")
@Produces(MediaType.TEXT_HTML)
public class BookViewController {
    private BookService bookService = new BookService();

    @GET
    @Path("/book/{id}")
    public BookView viewBook(@Context HttpServletRequest request, @PathParam("id") String id) {
        return new BookView(bookService.getBook(id));
    }
}
