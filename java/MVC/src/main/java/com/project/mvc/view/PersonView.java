package com.project.mvc.view;

import com.project.mvc.model.Employee;

import java.util.ArrayList;

public class PersonView {
    private final ArrayList<Employee> employees;

    public PersonView(Employee employee) {
        if (employee == null) {
            employee = new Employee();
            employee.setName("Employee not found.");
        }
        ArrayList<Employee> employees = new ArrayList<>();
        employees.add(employee);
        this.employees = employees;

    }

}
