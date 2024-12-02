package org.example;

import org.example.mysql.MySqlCredential;
import org.example.mysql.MySqlExecutor;
import org.example.tables.Student;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {

        String baseUrl = "jdbc:mysql://localhost:3306";
        String username = "root";
        String password = "Sumit@123";
        MySqlCredential mySqlCredential = new MySqlCredential(null, baseUrl, username, password);
        MySqlExecutor mySqlExecutor = new MySqlExecutor(mySqlCredential);
        ArrayList<Student> studentData = mySqlExecutor.getStudentData(mySqlExecutor);
        System.out.println(studentData);
    }
}
