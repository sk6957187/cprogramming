package com.project.mvc.view;

import com.project.mvc.model.Employee;
import io.dropwizard.views.View;

import java.util.ArrayList;

public class EmployeeView extends View {
    private final ArrayList<Employee> employees;

    public EmployeeView(ArrayList<Employee> employees) {
        super("employee-2.ftl");
        if (employees == null) {
            employees = new ArrayList<>();
        }
        this.employees = employees;
    }
    public ArrayList<Employee> getEmployees() {
        return employees;
    }
}
