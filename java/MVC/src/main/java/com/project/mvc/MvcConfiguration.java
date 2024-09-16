package com.project.mvc;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.mvc.model.mysql.MysqlConfig;
import io.dropwizard.Configuration;

@JsonIgnoreProperties(ignoreUnknown = true)

public class MvcConfiguration extends Configuration {
    private String dbSource;
    private String employeeCsvFilePath;
    private String employeeXlsxFilePath;
    private String employeeXlsxSheetName;
    private String employeeXlsxSheetIndex;
    private MysqlConfig mysqlConfig;
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

    public MysqlConfig getMysqlConfig() {
        return mysqlConfig;
    }

    public void setMysqlConfig(MysqlConfig mysqlConfig) {
        this.mysqlConfig = mysqlConfig;
    }

    @Override
    public String toString() {
        return "MvcConfiguration{" +
                "dbSource='" + dbSource + '\'' +
                ", employeeCsvFilePath='" + employeeCsvFilePath + '\'' +
                ", employeeXlsxFilePath='" + employeeXlsxFilePath + '\'' +
                ", employeeXlsxSheetName='" + employeeXlsxSheetName + '\'' +
                ", employeeXlsxSheetIndex='" + employeeXlsxSheetIndex + '\'' +
                ", mysqlConfig=" + mysqlConfig +
                '}';
    }
}
