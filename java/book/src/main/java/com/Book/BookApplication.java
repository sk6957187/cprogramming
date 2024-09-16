package com.book;


import com.book.resource.BookController;
import com.book.resource.BookViewController;
import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;

public class BookApplication extends Application<Configuration> {
    public static void main(String[] args) throws Exception {
        new BookApplication().run(args);
    }

    @Override
    public void initialize(Bootstrap<Configuration> bootstrap) {
        // nothing to do yet
        bootstrap.addBundle(new ViewBundle<>());
    }

    @Override
    public void run(Configuration c, Environment e) throws Exception {
        e.jersey().register(new BookController());
        e.jersey().register(new BookViewController());
    }
}

