package com.project.dailyRepot.controller;

import com.project.dailyRepot.DailyReport;
import com.project.dailyRepot.service.DailyReportService;

import java.sql.*;
import java.util.ArrayList;

public class DailyReportView {

    private DailyReport dailyReport;
    private final DailyReportService dailyReportService;

    public DailyReportView(DailyReport dailyReport) {
        this.dailyReport = dailyReport;
        this.dailyReportService = new DailyReportService();
    }

    public ArrayList<ArrayList<String>> sqlData() {
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            con = dailyReportService.getConnectionService().OracleSql();
            if (con != null) {
                System.out.println("Connection established..");
                stmt = con.createStatement();
                rs = stmt.executeQuery("select * from daily_report");

                while (rs.next()) {
                    ArrayList<String> row = new ArrayList<>();
                    row.add(String.valueOf(rs.getInt("SNO")));
                    row.add(rs.getString("START_DATE"));
                    row.add(rs.getString("USERID"));
                    row.add(rs.getString("SUB"));
                    row.add(rs.getString("TOPIC"));
                    row.add(rs.getString("TOPIC_DETAILS"));
                    row.add(rs.getString("COMPLETED"));
                    row.add(String.valueOf(rs.getDate("ADDED_DATE")));
                    row.add(String.valueOf(rs.getTimestamp("UPDATE_TIME")));
                    data.add(row);
                    System.out.println(row);
                }
            } else {
                System.out.println("Connection error..");
            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (con != null) con.close();
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e);
            }
        }

        return data;
    }
}
