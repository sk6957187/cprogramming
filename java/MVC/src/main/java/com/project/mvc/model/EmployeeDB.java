package com.project.mvc.model;

import java.util.ArrayList;
import java.util.HashMap;

public class EmployeeDB {
    private static ArrayList<Employee> employees = new ArrayList<>();
    public EmployeeDB() {}
    public ArrayList<Employee> getEmployees(){
        return employees;
    }
    public void clearEmployeeList() {
        employees = new ArrayList<>();
    }
    public Employee getEmployee(String id){
        return employees.get(Integer.parseInt(id));
    }

    public void updateEmployee(Employee employee) {
        if (employees == null || employee == null) {
            return;
        }
        int newEmployeeId = Integer.parseInt(employee.getPersonId());
        int oldEmployeeId;
        int i= 0;
        for(Employee employee1: employees) {
            oldEmployeeId = Integer.parseInt(employee1.getPersonId());
            if (newEmployeeId == oldEmployeeId) {
                employees.add(i, employee);
                break;
            }
        }
    }
    public void addEmployee(Employee employee) {
        employees.add(employee);
    }
    public void removeEmployee(Integer id){
        employees.remove(id);
    }
    // This will over written
    public void update() {}
    public void insert(Employee employee) {}
    public void updateEmployeeByData(ArrayList<ArrayList<String>> employeeData){
        ArrayList<ArrayList<String>> employees = new ArrayList<>();
        String s_no, name, age, date;
        Employee employee;
        this.clearEmployeeList();
        if(employeeData != null) {
            for (ArrayList<String> row: employeeData) {
                if (row == null) {
                    continue;
                }
                if (row.size() <= 3) {
                    continue;
                }
                s_no = row.get(0);
                name = row.get(1);
                age = row.get(2);
                date = row.get(3);
                employee = new Employee(s_no, name, age, date);
                this.addEmployee(employee);
            }
        }
    }
}
