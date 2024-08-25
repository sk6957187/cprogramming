package com.project.rest.view;
import com.project.rest.representations.Employee;
import io.dropwizard.views.View;

public class PersonView extends View {
    private final Employee employee;

    public PersonView(Employee employee) {
        super("employee.ftl");
        if (employee == null) {
            employee = new Employee();
            employee.setName("Employee not found.");
        }
        this.employee = employee;
    }

    public Employee getEmployee() {
        return employee;
    }
}