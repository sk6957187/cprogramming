package org.example;

import ch.qos.logback.classic.Logger;
import io.dropwizard.core.Application;
import io.dropwizard.core.Configuration;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import org.slf4j.LoggerFactory;

    
public class Main<MainConfiguration extends Configuration> extends Application<MainConfiguration> {
    private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(Main.class);;

    @Override
    public void initialize(Bootstrap<MainConfiguration> b) {
        super.initialize(b);
    }

    public static void main(String[] args) throws Exception {
        new Main().run(args);
    }

    @Override
    public void run(MainConfiguration c, Environment e) throws Exception {
        LOGGER.info("Registering REST resources");
        //e.jersey().register(new ResponseFilter());
        //e.jersey().register(new EmployeeRESTController());
    }
}