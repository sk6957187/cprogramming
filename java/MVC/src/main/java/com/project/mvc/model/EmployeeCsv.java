package com.project.mvc.model;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.project.mvc.MVCApplication;
import com.project.mvc.MvcConfiguration;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class EmployeeCsv extends EmployeeDB {
    private final MvcConfiguration mvcConfiguration;
    public EmployeeCsv(MvcConfiguration mvcConfiguration) {
        this.mvcConfiguration = mvcConfiguration;
    }


    private ArrayList<ArrayList<String>> getEmployeeData() {
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        ArrayList<String> fileData = new ArrayList<>();
        ArrayList<String> row;
        String csvFilePath = mvcConfiguration.getEmployeeCsvFilePath();
        String line = "";

        try {
            BufferedReader br = new BufferedReader(new FileReader(csvFilePath));
            System.out.println("CSV file found.");
            while ((line = br.readLine()) != null) {
                fileData.add(line);
            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        data = this.convertFileDataToEmployeeData(fileData);
        System.out.println(data);
        return data;
    }

    private ArrayList<ArrayList<String>> convertFileDataToEmployeeData(ArrayList<String> fileData) {
        ArrayList<ArrayList<String>> employeeData = new ArrayList<>();
        ArrayList<String> row;
        for (String fileLine: fileData) {
            String[] row1 = fileLine.split(",");
            row = new ArrayList<>(Arrays.asList(row1));
            employeeData.add(row);
        }
        return employeeData;
    }

    public void update() {
        ArrayList<ArrayList<String>> employeeData = this.getEmployeeData();
        this.updateEmployeeByData(employeeData);

    }
}
