package com.project.rest;

import com.project.rest.controller.EmployeeRESTController;
import com.project.rest.controller.ViewController;
import com.project.rest.dao.EmployeeCsv;
import com.project.rest.dao.EmployeeDB;
import com.project.rest.dao.EmployeeXlsx;
import com.project.rest.filter.ResponseFilter;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MainApplication extends Application<MainConfiguration> {
    private static final Logger LOGGER = LoggerFactory.getLogger(MainApplication.class);

    @Override
    public void initialize(Bootstrap<MainConfiguration> b) {
        super.initialize(b);
        b.addBundle(new ViewBundle<>());
        //b.addBundle((Bundle) new AssetsBundle("/assets", "/", "index.html"));
    }

    @Override
    public void run(MainConfiguration mainConfiguration, Environment e) throws Exception {
        LOGGER.info("Registering REST resources");
        String dbSource = mainConfiguration.getDbSource();
        EmployeeDB employeeDB;
        if ("csv".equals(dbSource)) {
            employeeDB = new EmployeeCsv(mainConfiguration);
        } else if ("xlsx".equals(dbSource)) {
            employeeDB = new EmployeeXlsx(mainConfiguration);
        } else {
            employeeDB = new EmployeeCsv(mainConfiguration);
        }
        e.jersey().register(new ResponseFilter());
        e.jersey().register(new EmployeeRESTController(employeeDB));
        e.jersey().register(new ViewController(employeeDB));
    }

    public static void main(String[] args) throws Exception {
        new MainApplication().run(args);
    }
}
