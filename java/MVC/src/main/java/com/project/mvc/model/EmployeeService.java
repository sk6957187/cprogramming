package com.project.mvc.model;

import java.util.ArrayList;
import java.util.HashMap;

public class EmployeeService {
    private final EmployeeDB employeeDB;
    public EmployeeService(EmployeeDB employeeDB) {
        this.employeeDB = employeeDB;
    }

    public HashMap<String, Object> getEmployees() {
        HashMap<String, Object> result = new HashMap<>();
        this.employeeDB.update();
        ArrayList<Employee> employees = employeeDB.getEmployees();
        result.put("Result", "OK");
        result.put("Records", employees);
        result.put("TotalRecordCount", employees.size());
        return result;
    }
    public ArrayList<Employee> getEmployeesAsList() {
        this.employeeDB.update();
        return employeeDB.getEmployees();
    }
    public Employee getEmployeeById(String employeeId) {
        this.employeeDB.update();
        return employeeDB.getEmployee(employeeId);
    }
    public void insertEmployee(Employee employee) {
        employeeDB.insert(employee);
    }
}