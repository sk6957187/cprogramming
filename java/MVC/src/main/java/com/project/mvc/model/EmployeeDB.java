package com.project.mvc.model;

import java.util.ArrayList;
import java.util.HashMap;

public class EmployeeDB {
    private static HashMap<Integer, Employee> employees = new HashMap<>();
    public EmployeeDB() {}
    public ArrayList<Employee> getEmployees(){
        return new ArrayList<>(employees.values());
    }
    public void clearEmployeeList() {
        employees = new HashMap<>();
    }
    public Employee getEmployee(String id){
        return employees.get(Integer.parseInt(id));
    }

    public void updateEmployee(String id, Employee employee){
        employees.put(Integer.valueOf(id), employee);
    }

    public void removeEmployee(Integer id){
        employees.remove(id);
    }
    // This will over written
    public void update() {}
    public void updateEmployeeByData(ArrayList<ArrayList<String>> employeeData){
        employees = new HashMap<>();
        String s_no, name, age, date;
        Employee employee;
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
                this.updateEmployee(employee.getPersonId(), employee);
            }
        }
    }
}
