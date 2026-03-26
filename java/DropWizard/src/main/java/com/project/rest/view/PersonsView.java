package com.project.rest.view;
import com.project.rest.representations.Employee;
import io.dropwizard.views.View;

import java.util.ArrayList;

public class PersonsView extends View {
    private final ArrayList<Employee> employees;

    public PersonsView(ArrayList<Employee> employees) {
        super("employee.ftl");
        if (employees == null) {
            employees = new ArrayList<>();
        }
        this.employees = employees;

    }
    public ArrayList<Employee> getEmployees() {
        return employees;
    }
}