package com.project.dailyRepot;

import com.project.dailyRepot.controller.DailyReportRESTController;
import com.project.dailyRepot.service.DailyReportService;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;

public class DailyReport extends Application<DailyReportConfiguration> {
    private static final Logger LOGGER = LoggerFactory.getLogger(DailyReport.class);

    public void run(DailyReportConfiguration dailyReportConfiguration, Environment environment) throws Exception {
        LOGGER.info("Registering REST resources");

        DailyReportService dailyReportService = new DailyReportService();

        environment.jersey().register(new DailyReportRESTController(dailyReportService));
    }

    public static void main(String[] args) throws Exception {
        new DailyReport().run(args);
    }
}
