package com.project.rest.service;

import com.project.rest.dao.EmployeeDB;
import com.project.rest.representations.Employee;

import java.util.ArrayList;
import java.util.HashMap;

public class EmployeeService {
    private final EmployeeDB employeeDB;
    public EmployeeService(EmployeeDB employeeDB) {
        this.employeeDB = employeeDB;
    }
    public HashMap<String, Object> getEmployees() {
        HashMap<String, Object> result = new HashMap<>();
        ArrayList<Employee> employees = employeeDB.getEmployees();
        result.put("Result", "OK");
        result.put("Records", employees);
        result.put("TotalRecordCount", employees.size());
        return result;
    }
}
