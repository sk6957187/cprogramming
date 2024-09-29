package com.project.mvc.model.mysql;

import com.project.mvc.MvcConfiguration;
import com.project.mvc.model.Employee;
import com.project.mvc.model.EmployeeDB;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;


public class EmployeeOraclesql extends EmployeeDB {
    private MvcConfiguration mvcConfiguration;
    public EmployeeOraclesql(MvcConfiguration mvcConfiguration) {
        this.mvcConfiguration = mvcConfiguration;
    }
    private Connection getSqlConnection() {
        Connection con = null;
        try {

            String driver = mvcConfiguration.getOraclesqlConfig().getDriver();
            Class.forName(driver);
            System.out.println("Driver loaded of oracleSql..");
            //String url = "jdbc:oracle:thin:@Sumit11:1521:xe";
            String url = mvcConfiguration.getOraclesqlConfig().getUrl();
            String username = mvcConfiguration.getOraclesqlConfig().getUsername();
            String password = mvcConfiguration.getOraclesqlConfig().getPassword();

//step2 create  the connection object
            con = DriverManager.getConnection(url, username, password);
        } catch (Exception e) {
            System.out.println("Connection failed");
        }
        return con;
    }
    private ArrayList<ArrayList<String>> getEmployeeData(){
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        try{
//step2 create  the connection object
            Connection con= this.getSqlConnection();

//step3 create the statement object
            Statement stmt=con.createStatement();
            if (con != null) {
                System.out.println("Connection successful..");
            } else {
                System.out.println("Connection error..");
            }


            //ResultSet rs=stmt.executeQuery("select * from employee where employee_id=1 and employee_name= 'Sumit Kumar'"); //select * from employee;
            ResultSet rs = stmt.executeQuery("SELECT * FROM employee where deleted = 'NO' ORDER BY employee_id DESC");

            while(rs.next()) {
                ArrayList<String> row = new ArrayList<>();
                row.add(String.valueOf(rs.getInt("employee_id")));
                row.add(rs.getString("employee_name"));
                row.add(rs.getString("age"));
                row.add(rs.getString("record_date"));
                System.out.println(rs.getInt(1) + "  " + rs.getString(2) + "  " + rs.getString(3) + " " + rs.getString(4));
                data.add(row);
            }
//            con.close();
        }catch(Exception e){ System.out.println(e);}
        return data;
    }

    public void update() {
        ArrayList<ArrayList<String>> employeeData = this.getEmployeeData();
        this.updateEmployeeByData(employeeData);
    }
    public void insert(Employee employee) {
        System.out.println(employee);
        //System.out.println(employee.getName());
        try {
            Connection con = this.getSqlConnection();
            String query = "INSERT INTO employee (employee_name, age, record_date) VALUES (?, ?, ?)";
            PreparedStatement stmt = con.prepareStatement(query);

            int age = Integer.parseInt(employee.getAge());

            stmt.setString(1, employee.getName());
            stmt.setInt(2, age);
            stmt.setString(3, employee.getRecordDate());
            stmt.executeUpdate();
            stmt = con.prepareStatement("commit");
            stmt.executeUpdate();

        } catch (Exception e) {
            System.out.println("Connection failed");
        }
    }
}
