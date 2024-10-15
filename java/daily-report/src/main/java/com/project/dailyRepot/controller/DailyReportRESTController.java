package com.project.dailyRepot.controller;

import com.project.dailyRepot.service.DailyReportService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;

@Path("/daily-report")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class DailyReportRESTController {
    private final DailyReportService dailyReportService;

    public DailyReportRESTController(DailyReportService dailyReportService) {
        this.dailyReportService = dailyReportService;
    }

    @GET
    public Response getDailyReport() {
        return Response.ok("Hello from Daily Report Service").build();
    }
    @GET
    @Path("/view")
    @Produces(MediaType.APPLICATION_JSON)
    public Response viewDailyReport() {
        ArrayList<ArrayList<String>> data = dailyReportService.getDailyReportView().sqlData();
        return Response.ok(data).build();
    }

}
