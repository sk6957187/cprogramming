package com.project.mvc.model.mysql;

import com.project.mvc.MvcConfiguration;
import com.project.mvc.model.EmployeeDB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class EmployeeOraclesql extends EmployeeDB {
    private MvcConfiguration mvcConfiguration;
    public EmployeeOraclesql(MvcConfiguration mvcConfiguration) {
        this.mvcConfiguration = mvcConfiguration;
    }

    private ArrayList<ArrayList<String>> getEmployeeData(){
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        try{
            
            Class.forName("oracle.jdbc.driver.OracleDriver");

//step2 create  the connection object
            Connection con= DriverManager.getConnection(
                    "jdbc:oracle:thin:@localhost:1521:xe","system","oracle");

//step3 create the statement object
            Statement stmt=con.createStatement();

//step4 execute query
            ResultSet rs=stmt.executeQuery("select * from emp");
            while(rs.next())
                System.out.println(rs.getInt(1)+"  "+rs.getString(2)+"  "+rs.getString(3));

//step5 close the connection object
            con.close();

        }catch(Exception e){ System.out.println(e);}

        return data;
    }

    public void update() {
        ArrayList<ArrayList<String>> employeeData = this.getEmployeeData();
        this.updateEmployeeByData(employeeData);

    }
}
