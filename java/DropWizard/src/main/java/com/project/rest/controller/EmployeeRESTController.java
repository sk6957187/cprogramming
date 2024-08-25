package com.project.rest.controller;

import com.project.rest.dao.EmployeeCsv;
import com.project.rest.dao.EmployeeDB;
import com.project.rest.dao.EmployeeXlsx;
import com.project.rest.representations.Employee;
import com.project.rest.service.EmployeeService;
import com.project.rest.view.PersonView;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.net.URISyntaxException;

@Path("/employees")
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeRESTController {
//    private final Validator validator;

    private final EmployeeService employeeService;
    private final EmployeeDB employeeDB;
    public EmployeeRESTController(EmployeeDB employeeDB) {
//        this.validator = validator;
        this.employeeDB = employeeDB;
        this.employeeService = new EmployeeService(employeeDB);
    }

    @GET
    public Response getEmployees() {
        return Response.ok(employeeService.getEmployees()).build();
    }

    @POST
    public Response getEmployeesByPost() {
        return Response.ok(employeeService.getEmployees()).build();
    }

    @GET
    @Path("/{id}")
    public Response getEmployeeById(@PathParam("id") Integer id) {
        Employee employee = employeeDB.getEmployee(String.valueOf(id));
        if (employee != null) {
            return Response.ok(employee).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @Path("/create")
    @POST
    public Response createEmployee(Employee employee) throws URISyntaxException {
        // validation
        if (employee != null) {
            Employee e = employeeDB.getEmployee(employee.getPersonId());
            if (e != null) {
                employeeDB.updateEmployee(e.getPersonId(), employee);
                return Response.created(new URI("/employees/" + e.getPersonId()))
                        .build();
            } else {
                employeeDB.updateEmployee(employee.getPersonId(), employee);
                return Response.created(new URI("/employees/" + employee.getPersonId())).build();
            }
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

//    @PUT
//    @Path("/{id}")
//    public Response updateEmployeeById(@PathParam("id") Integer id, Employee employee) {
//        // validation
//        Set<ConstraintViolation<Employee>> violations = validator.validate(employee);
//        Employee e = EmployeeDB.getEmployee(employee.getId());
//        if (violations.size() > 0) {
//            ArrayList<String> validationMessages = new ArrayList<String>();
//            for (ConstraintViolation<Employee> violation : violations) {
//                validationMessages.add(violation.getPropertyPath().toString() + ": " + violation.getMessage());
//            }
//            return Response.status(Response.Status.BAD_REQUEST).entity(validationMessages).build();
//        }
//        if (e != null) {
//            employee.setId(id);
//            EmployeeDB.updateEmployee(id, employee);
//            return Response.ok(employee).build();
//        } else
//            return Response.status(Response.Status.NOT_FOUND).build();
//    }

    @DELETE
    @Path("/{id}")
    public Response removeEmployeeById(@PathParam("id") Integer id) {
        Employee employee = employeeDB.getEmployee(String.valueOf(id));
        if (employee != null) {
            employeeDB.removeEmployee(id);
            return Response.ok().build();
        } else
            return Response.status(Response.Status.NOT_FOUND).build();
    }
}
