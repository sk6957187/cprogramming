package com.project.rest.controller;

import com.project.rest.dao.EmployeeCsv;
import com.project.rest.dao.EmployeeDB;
import com.project.rest.dao.EmployeeXlsx;
import com.project.rest.representations.Employee;
import com.project.rest.service.EmployeeService;
import com.project.rest.view.PersonView;
import com.project.rest.view.PersonsView;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;

@Path("/view")
public class ViewController {
    private final EmployeeService employeeService;
    private final EmployeeDB employeeDB;
    public ViewController(EmployeeDB employeeDB) {
        this.employeeDB = employeeDB;
        this.employeeService = new EmployeeService(employeeDB);
    }
    @GET()
    @Path("/employees")
    @Produces(MediaType.TEXT_HTML)
    @Consumes(MediaType.APPLICATION_JSON)
    public PersonsView getEmployees() {
        ArrayList<Employee> employees = employeeService.getEmployeesAsList();
        return new PersonsView(employees);
    }

    @GET
    @Path("/employee/{id}")
    @Produces(MediaType.TEXT_HTML)
    @Consumes(MediaType.APPLICATION_JSON)
    public PersonView getViewEmployeeById(@PathParam("id") Integer id) {
        Employee employee = employeeService.getEmployeeById(String.valueOf(id));
        return new PersonView(employee);
    }
}
