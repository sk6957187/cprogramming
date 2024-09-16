package com.project.rest.view;
import com.project.rest.representations.Employee;
import io.dropwizard.views.View;

import java.util.ArrayList;

public class PersonView extends View {
    private final ArrayList<Employee> employees;

    public PersonView(Employee employee) {
        super("employee.ftl");
        if (employee == null) {
            employee = new Employee();
            employee.setName("Employee not found.");
        }
        ArrayList<Employee> employees = new ArrayList<>();
        employees.add(employee);
        this.employees = employees;

    }

    public ArrayList<Employee> getEmployees() {
        return employees;
    }
}