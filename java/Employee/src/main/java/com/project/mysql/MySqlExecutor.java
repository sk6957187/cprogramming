package com.project.mysql;

import com.project.mysqlTables.Employee;


import java.util.ArrayList;

public class MySqlExecutor {
    private final MySqlCredential mySqlCredential;
    private final String hitDb;
    public MySqlExecutor(MySqlCredential mySqlCredential) {
        this.mySqlCredential = mySqlCredential;
        this.hitDb = mySqlCredential.getBaseUrl() + "/hit??autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true";
    }
    public ArrayList<Employee> getEmployeeData(MySqlExecutor mySqlExecutor) {
        String query = "SELECT * FROM employee;";
        MySqlConnection mySqlConnection = new MySqlConnection(this.hitDb, mySqlCredential);
        mySqlConnection.Connect();
        ArrayList<Employee> result = mySqlConnection.readStudentData(query);
        mySqlConnection.close();
        return result;
    }
}
