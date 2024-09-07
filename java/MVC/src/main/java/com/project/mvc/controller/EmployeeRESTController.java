package com.project.mvc.controller;

import com.project.mvc.model.Employee;
import com.project.mvc.model.EmployeeDB;
import com.project.mvc.model.EmployeeService;
import com.project.mvc.view.EmployeeView;
import com.project.mvc.view.PersonView;

import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/api/employees")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeRESTController {

    private final EmployeeService employeeService;
    private final EmployeeDB employeeDB;
    public EmployeeRESTController(EmployeeDB employeeDB) {
        this.employeeDB = employeeDB;
        this.employeeService = new EmployeeService(this.employeeDB);
    }
    @GET
    public Response getEmployees() {
        return Response.ok(employeeService.getEmployees()).build();
    }

    @GET()
    @Path("/view")
    @Produces(MediaType.TEXT_HTML)
    public EmployeeView viewEmployees() {
        return new EmployeeView(employeeService.getEmployeesAsList());
    }


    @POST
    public Response getEmployeesByPost() {
        return Response.ok(employeeService.getEmployees()).build();
    }

    @GET
    @Path("/{id}")
    public Response getEmployeeById(@PathParam("id") Integer id) {
        Employee employee = employeeService.getEmployeeById(String.valueOf(id));
        if (employee != null) {
            return Response.ok(employee).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

//    public Response createEmployee(Employee employee) throws URISyntaxException {
//        // validation
//        if (employee != null) {
//            Employee e = employeeDB.(employee.getPersonId());
//            if (e != null) {
//                employeeDB.updateEmployee(e.getPersonId(), employee);
//                return Response.created(new URI("/employees/" + e.getPersonId()))
//                        .build();
//            } else {
//                employeeDB.updateEmployee(employee.getPersonId(), employee);
//                return Response.created(new URI("/employees/" + employee.getPersonId())).build();
//            }
//        }
//        return Response.status(Response.Status.NOT_FOUND).build();
//    }

    @DELETE
    public Response removeEmployeeById(@PathParam("id") Integer id) {
        Employee employee = employeeService.getEmployeeById(String.valueOf(id));
        if (employee != null) {
            employeeDB.removeEmployee(id);
            return Response.ok().build();
        } else
            return Response.status(Response.Status.NOT_FOUND).build();
    }
}