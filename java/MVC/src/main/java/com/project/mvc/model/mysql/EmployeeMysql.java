package com.project.mvc.model.mysql;

import com.project.mvc.MvcConfiguration;
import com.project.mvc.model.EmployeeDB;

import java.sql.*;
import java.util.ArrayList;

public class EmployeeMysql extends EmployeeDB {
    private MvcConfiguration mvcConfiguration;
    public EmployeeMysql(MvcConfiguration mvcConfiguration) {
        this.mvcConfiguration = mvcConfiguration;
    }

    private ArrayList<ArrayList<String>> getEmployeeData() {
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        MysqlConfig mysqlConfig = mvcConfiguration.getMysqlConfig();
        if (mysqlConfig == null) {
            return data;
        }
        try {
            String driver = mysqlConfig.getDriver();
            String url = mysqlConfig.getUrl();
            String username = mysqlConfig.getUsername();
            String password = mysqlConfig.getPassword();


            Class.forName(driver);
            Connection con = DriverManager.getConnection(url, username, password);

            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from employee");
            // Process the result set
            if (rs==null) {
                System.out.println("File is empty...");
            }
            while (rs.next()) {
                ArrayList<String> row = new ArrayList<>();
                row.add(String.valueOf(rs.getInt("employee_id")));
                row.add(rs.getString("name"));
                row.add(rs.getString("age"));
                row.add(rs.getString("record_date"));
                //System.out.println(rs.getInt(1) + "  " + rs.getString(2) + "  " + rs.getString(3) + " " + rs.getString(4));
                data.add(row);
            }
            // Close connections
            rs.close();
            stmt.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        //data = this.convertFileDataToEmployeeData(fileData);
        System.out.println(data);
        return data;
    }

//    private ArrayList<ArrayList<String>> convertFileDataToEmployeeData(ArrayList<String> fileData) {
//        ArrayList<ArrayList<String>> employeeData = new ArrayList<>();
//        ArrayList<String> row;
//        for (String fileLine: fileData) {
//            String[] row1 = fileLine.split(",");
//            row = new ArrayList<>(Arrays.asList(row1));
//            employeeData.add(row);
//        }
//        return employeeData;
//    }

    public void update() {
        ArrayList<ArrayList<String>> employeeData = this.getEmployeeData();
        this.updateEmployeeByData(employeeData);

    }

}