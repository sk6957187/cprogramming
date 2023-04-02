package com.project.rest.dao;

import com.project.rest.representations.Employee;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class EmployeeDB {
    static HashMap<Integer, Employee> employees = new HashMap<>();
    static{
        employees.put(1, new Employee(1, "Lokesh", 20, "2023-04-01"));
        employees.put(2, new Employee(2, "John", 21, "2023-04-01"));
        employees.put(3, new Employee(3, "Melcum", 22, "2023-04-01"));
    }

    public ArrayList<Employee> getEmployees(){
        return new ArrayList<>(employees.values());
    }

    public Employee getEmployee(Integer id){
        return employees.get(id);
    }

    public void updateEmployee(Integer id, Employee employee){
        employees.put(id, employee);
    }

    public void removeEmployee(Integer id){
        employees.remove(id);
    }
}
