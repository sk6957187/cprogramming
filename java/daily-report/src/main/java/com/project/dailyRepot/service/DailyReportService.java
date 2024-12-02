package com.project.dailyRepot.service;

import com.project.dailyRepot.DailyReport;
import com.project.dailyRepot.controller.DailyReportView;

public class DailyReportService {
    private ConnectionService connectionService;
    private DailyReport dailyReport;

    // Constructor
    public DailyReportService() {
        this.dailyReport = new DailyReport();
        this.connectionService = new ConnectionService();
    }

    // Getter for DailyReport
    public DailyReport getDailyReport() {
        return dailyReport;
    }

    // Method to get the DailyReportView
    public DailyReportView getDailyReportView() {
        // Create and return a DailyReportView object, passing dailyReport to its constructor
        return new DailyReportView(dailyReport);
    }
    public ConnectionService getConnectionService() {
        return connectionService;
    }
}
