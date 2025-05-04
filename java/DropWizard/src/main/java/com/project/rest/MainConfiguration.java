package com.project.rest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.dropwizard.Configuration;

@JsonIgnoreProperties(ignoreUnknown = true)

public class MainConfiguration extends Configuration {
    private String dbSource;
    private String employeeCsvFilePath;
    private String employeeXlsxFilePath;
    private String employeeXlsxSheetName;
    private String employeeXlsxSheetIndex;

    public String getDbSource() {
        return dbSource;
    }

    public void setDbSource(String dbSource) {
        this.dbSource = dbSource;
    }

    public String getEmployeeCsvFilePath() {
        return employeeCsvFilePath;
    }

    public void setEmployeeCsvFilePath(String employeeCsvFilePath) {
        this.employeeCsvFilePath = employeeCsvFilePath;
    }

    public String getEmployeeXlsxFilePath() {
        return employeeXlsxFilePath;
    }

    public void setEmployeeXlsxFilePath(String employeeXlsxFilePath) {
        this.employeeXlsxFilePath = employeeXlsxFilePath;
    }

    public String getEmployeeXlsxSheetName() {
        return employeeXlsxSheetName;
    }

    public void setEmployeeXlsxSheetName(String employeeXlsxSheetName) {
        this.employeeXlsxSheetName = employeeXlsxSheetName;
    }

    public String getEmployeeXlsxSheetIndex() {
        return employeeXlsxSheetIndex;
    }

    public void setEmployeeXlsxSheetIndex(String employeeXlsxSheetIndex) {
        this.employeeXlsxSheetIndex = employeeXlsxSheetIndex;
    }

    @Override
    public String toString() {
        return "MainConfiguration{" +
                "dbSource='" + dbSource + '\'' +
                ", employeeCsvFilePath='" + employeeCsvFilePath + '\'' +
                ", employeeXlsxFilePath='" + employeeXlsxFilePath + '\'' +
                ", employeeXlsxSheetName='" + employeeXlsxSheetName + '\'' +
                ", employeeXlsxSheetIndex='" + employeeXlsxSheetIndex + '\'' +
                '}';
    }
}
