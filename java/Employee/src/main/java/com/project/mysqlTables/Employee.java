package com.project.mysqlTables;

import java.sql.ResultSet;

public class Employee {
    private int employeeId;
    private String employeeName;
    private int salary;

    public Employee() {
    }

    public Employee(int employeeId, String employeeName, int salary) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.salary = salary;
    }

    public Employee(ResultSet rs) {
        if (rs == null) {
            return;
        }
        try {
            employeeId = rs.getInt("studentId");
            employeeName = rs.getString("studentName");
            salary = rs.getInt("studentId");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employeeId=" + employeeId +
                ", employeeName='" + employeeName + '\'' +
                ", salary=" + salary +
                '}';
    }
}
