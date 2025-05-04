package com.project.mvc;

import com.project.mvc.controller.EmployeeRESTController;
import com.project.mvc.filter.RequestFilter;
import com.project.mvc.filter.ResponseFilter2;
import com.project.mvc.model.EmployeeCsv;
import com.project.mvc.model.EmployeeDB;
import com.project.mvc.model.EmployeeXlsx;
import com.project.mvc.model.mysql.EmployeeMysql;
import com.project.mvc.model.mysql.EmployeeOraclesql;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MVCApplication extends Application<MvcConfiguration> {
    private static final Logger LOGGER = LoggerFactory.getLogger(MVCApplication.class);

    @Override
    public void initialize(Bootstrap<MvcConfiguration> bootstrap) {
        super.initialize(bootstrap);
        bootstrap.addBundle(new ViewBundle<>());
        bootstrap.addBundle(new AssetsBundle("/assets/", "/assets"));

    }

    //    @Override
//    public <MVCConfiguration> void run(MVCConfiguration mvcConfiguration, Environment e) throws Exception {
//        LOGGER.info("Registering REST resources");
//        String dbSource = "Text.txt";
//        EmployeeDB employeeDB;
//        employeeDB = new EmployeeCsv<>(dbSource);
//        employeeDB = null;
//        e.jersey().register(new ResponseFilter());
//        e.jersey().register(new EmployeeRESTController(employeeDB));
//        //e.jersey().register(new ViewController(employeeDB));
//    }
    @Override
    public void run(MvcConfiguration mvcConfiguration, Environment environment) throws Exception {
        LOGGER.info("Registering REST resources");

        EmployeeDB employeeDB;
        String dbSource = mvcConfiguration.getDbSource();
        if (dbSource != null) {
            if(dbSource.equals("oraclesql")){
                employeeDB = new EmployeeOraclesql(mvcConfiguration);
            }
            else if (dbSource.equals("mysql")) {
                employeeDB = new EmployeeMysql(mvcConfiguration);
            }else if(dbSource.equals("xlsx")) {
                employeeDB = new EmployeeXlsx(mvcConfiguration);
            }else{
                employeeDB = new EmployeeCsv(mvcConfiguration);
            }
        } else {
            employeeDB = new EmployeeCsv(mvcConfiguration);
        }
        environment.jersey().register(new RequestFilter());
        environment.jersey().register(new ResponseFilter2());
        environment.jersey().register(new EmployeeRESTController(employeeDB));
    }
    public static void main(String[] args) throws Exception {
        new MVCApplication().run(args);
    }
}