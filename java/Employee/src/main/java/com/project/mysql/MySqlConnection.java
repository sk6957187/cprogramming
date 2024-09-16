package com.project.mysql;

import com.project.StaticService;
import com.project.mysqlTables.Employee;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class MySqlConnection {
    private final MySqlCredential mySqlCredential;
    private final String url;
    private Connection con;
    public MySqlConnection(String url, MySqlCredential mySqlCredential) {
        this.url = url;
        this.mySqlCredential = mySqlCredential;
    }
    private void logParam() {
        System.out.println(mySqlCredential.toString());
    }
    public void close() {
        if (con == null) {
            StaticService.printLog("MySQL connection not found");
            return;
        }
        try {
            con.close();
            //StaticService.printLog("Connection closed");
        } catch (Exception e) {
            StaticService.printLog("Error in closing connection");
            e.printStackTrace();
        }
    }
    public void Connect() {
        this.logParam();
        try {
            Class.forName(mySqlCredential.getDriver());
            con = DriverManager.getConnection(url, mySqlCredential.getUsername(), mySqlCredential.getPassword());
            //StaticService.printLog("Connection success");
        } catch (Exception e) {
            //StaticService.printLog("Connection fail");
            e.printStackTrace();
        }
    }
    public ArrayList<Employee> readStudentData(String studentQuery) {
        ArrayList<Employee> result = new ArrayList<>();
        try{
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(studentQuery);
            while(rs.next()) {
                result.add(new Employee(rs));
            }
        } catch(Exception e) {
            System.out.println(e);
        }
        return result;
    }
}
