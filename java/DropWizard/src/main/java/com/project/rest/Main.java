package com.project.rest;

import com.project.rest.controller.EmployeeRESTController;
import com.project.rest.filter.ResponseFilter;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main extends Application<MainConfiguration> {
    private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

    @Override
    public void initialize(Bootstrap<MainConfiguration> b) {
        super.initialize(b);
    }

    @Override
    public void run(MainConfiguration c, Environment e) throws Exception {
        LOGGER.info("Registering REST resources");
        e.jersey().register(new ResponseFilter());
        e.jersey().register(new EmployeeRESTController());
    }

    public static void main(String[] args) throws Exception {
        new Main().run(args);
    }
}
