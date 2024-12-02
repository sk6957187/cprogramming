package com.project.mvc.controller;

import com.project.mvc.model.Employee;
import com.project.mvc.model.EmployeeDB;
import com.project.mvc.model.EmployeeService;
import com.project.mvc.view.EmployeeView;
import com.project.mvc.view.PersonView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/api/employees")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeRESTController {

    private final EmployeeService employeeService;
    public EmployeeRESTController(EmployeeDB employeeDB) {
        this.employeeService = new EmployeeService(employeeDB);
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
    @GET()
    @Path("/add")
    public Response addEmployees(@Context HttpServletRequest request,
                                     @QueryParam("person_id") String personId,
                                     @QueryParam("name") String name,
                                     @QueryParam("age") String age,
                                     @QueryParam("record_date") String recordDate) {
        Employee employee = new Employee(personId, name, age, recordDate);
        employeeService.insertEmployee(employee);
        System.out.println(employee);
        return Response.ok().build();
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
//            employeeDB.removeEmployee(id);
            return Response.ok().build();
        } else
            return Response.status(Response.Status.NOT_FOUND).build();
    }
}
