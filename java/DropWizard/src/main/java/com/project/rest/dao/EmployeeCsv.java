package com.project.rest.dao;

import com.project.rest.MainConfiguration;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class EmployeeCsv extends EmployeeDB {
//    static{
//        employees.put(1, new Employee(1, "Lokesh", 20, "2023-04-01"));
//        employees.put(2, new Employee(2, "John", 21, "2023-04-01"));
//        employees.put(3, new Employee(3, "Mohan", 22, "2023-04-01"));
//    }
    private final MainConfiguration mainConfiguration;
    public EmployeeCsv(MainConfiguration mainConfiguration) {
        this.mainConfiguration = mainConfiguration;
    }



    private ArrayList<ArrayList<String>> getEmployeeData() {
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        ArrayList<String> fileData = new ArrayList<>();
        ArrayList<String> row;
        String csvFile = mainConfiguration.getEmployeeCsvFilePath();
        String line = "";

        try {
            BufferedReader br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {
                fileData.add(line);
            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        data = this.convertFileDataToEmployeeData(fileData);
        return data;
    }

    private ArrayList<ArrayList<String>> convertFileDataToEmployeeData(ArrayList<String> fileData) {
        ArrayList<ArrayList<String>> employeeData = new ArrayList<>();
        ArrayList<String> row;
        for (String fileLine: fileData) {
            String[] row1 = fileLine.split(",");
            row = new ArrayList<>();
            row.addAll(Arrays.asList(row1));
            employeeData.add(row);
        }
        return employeeData;
    }

    public void update() {
        ArrayList<ArrayList<String>> employeeData = this.getEmployeeData();
        this.updateEmployeeByData(employeeData);
//        ArrayList<ArrayList<String>> employeeData = this.getEmployeeData();
//        employees.put(1, new Employee(1, "Lokesh", 20, "2023-04-01"));
//        employees.put(2, new Employee(2, "John", 21, "2023-04-01"));
//        employees.put(3, new Employee(3, "Mohan", 22, "2023-04-01"));

    }

}
