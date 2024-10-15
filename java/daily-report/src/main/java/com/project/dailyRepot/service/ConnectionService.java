package com.project.dailyRepot.service;

import java.sql.*;

public class  ConnectionService {
    public Connection OracleSql() throws SQLException, ClassNotFoundException {
        Connection con = null;
        try {
            // Load the Oracle JDBC driver
            Class.forName("oracle.jdbc.driver.OracleDriver");
            System.out.println("Driver loaded..");

            // Connection parameters
            String url = "jdbc:oracle:thin:@Sumit11:1521:xe";
            String username = "System";
            String password = "tiger";

            // Establish the sql
            con = DriverManager.getConnection(url, username, password);

            // Check if the sql was successful
            if (con != null) {
                System.out.println("Connection established..");
            } else {
                System.out.println("Connection error..");
            }
        } catch (Exception e) {
            // Handle any exceptions
            System.out.println("Error during sql: " + e.getMessage());
        }

        return con;  // Return the sql object
    }
}
