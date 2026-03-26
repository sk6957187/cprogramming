package com.jsp.CURDspring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.CURDspring.exception.IdNotFoundException;
import com.jsp.CURDspring.model.Employee;
import com.jsp.CURDspring.model.ResponseStructute;
import com.jsp.CURDspring.repository.EmployeeRepository;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
	@Autowired
	private  EmployeeRepository employeeRepository;
	
	@PostMapping
	public ResponseEntity<ResponseStructute<Employee>> SaveEmployee(@RequestBody Employee employee) {
		employeeRepository.save(employee);
		ResponseStructute<Employee> structure = new ResponseStructute<Employee>();
		structure.setData(employee);
		structure.setMessage("success");
		structure.setStatusCode(HttpStatus.CREATED.value());
		
		return new ResponseEntity<ResponseStructute<Employee>>(structure, HttpStatus.CREATED);
//		return structure;
		
		
//		return "Employee record save..!!";
		
	}
	
	@GetMapping
	public ResponseEntity<ResponseStructute<List<Employee>>> getAllEmp(){
		List<Employee> emp = employeeRepository.findAll();
		if(emp.size()>0) {
			ResponseStructute<List<Employee>> str = new ResponseStructute<List<Employee>>();
			str.setStatusCode(HttpStatus.FOUND.value());
			str.setMessage("success");
			str.setData(emp);
//			return str;
			return new ResponseEntity<ResponseStructute<List<Employee>>>(str, HttpStatus.FOUND);
		} else {
			ResponseStructute<List<Employee>> str = new ResponseStructute<List<Employee>>();
			str.setStatusCode(HttpStatus.NOT_FOUND.value());
			str.setMessage("failed");
			str.setData(null);
			return new ResponseEntity<ResponseStructute<List<Employee>>>(str, HttpStatus.NOT_FOUND);
//			return str;
		}
		
//				return emp;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseStructute<Employee>> getById(@PathVariable int id) {
		Optional<Employee> opt = employeeRepository.findById(id);
		if(opt.isPresent()) {
			ResponseStructute<Employee> structure = new ResponseStructute<Employee>();
			structure.setData(opt.get());
			structure.setMessage("success");
			structure.setStatusCode(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructute<Employee>>(structure, HttpStatus.OK);
//			return structure;
//			return opt.get();
		} else {
			throw new IdNotFoundException(); 
//			ResponseStructute<Employee> structure = new ResponseStructute<Employee>();
//			structure.setMessage("Id not found");
//			structure.setStatusCode(HttpStatus.NOT_FOUND.value());
//			return new ResponseEntity<ResponseStructute<Employee>>(structure, HttpStatus.NOT_FOUND);
//			return structure;
		}
	}
	
	@PutMapping
	public ResponseEntity<ResponseStructute<Employee>> updateEmp(@RequestBody Employee emp) {
		if (employeeRepository.existsById(emp.getId())) {
	        employeeRepository.save(emp);
	        ResponseStructute<Employee> structure = new ResponseStructute<Employee>();
			structure.setData(emp);
			structure.setMessage("Successfully updated");
			structure.setStatusCode(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructute<Employee>>(structure, HttpStatus.OK);
//			return structure;
//	        return "Successfully updated";
	    } else {
	    	ResponseStructute<Employee> structure = new ResponseStructute<Employee>();
			structure.setMessage("data not save");
			structure.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
			return new ResponseEntity<ResponseStructute<Employee>>(structure, HttpStatus.NOT_FOUND);
//			return structure;
//	        return "Employee not found";
	    }
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseStructute<Employee>> deleteEmp(@PathVariable int id) {
		Optional<Employee> opt = employeeRepository.findById(id);
		if(opt.isPresent()) {
			employeeRepository.delete(opt.get());
			ResponseStructute<Employee> structure = new ResponseStructute<Employee>();
			structure.setData(opt.get());
			structure.setMessage("Successfully deleted..!!");
			structure.setStatusCode(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructute<Employee>>(structure,HttpStatus.OK);
//			return structure;
//			return "Succefully deleted";
		} else {
			
			throw new IdNotFoundException();
			
//			ResponseStructute<Employee> structure = new ResponseStructute<Employee>();
//			structure.setMessage("Id not found..!!");
//			structure.setStatusCode(HttpStatus.NOT_FOUND.value());
//			return new ResponseEntity<ResponseStructute<Employee>>(structure, HttpStatus.NOT_FOUND);
//			return structure;
//			return "Id not found";
		}
	}
	
	@GetMapping("/salary/{salary}")
	public ResponseEntity<ResponseStructute<List<Employee>>> getBySal(@PathVariable double salary){
		List<Employee> emp = employeeRepository.findBySalary(salary);
		ResponseStructute<List<Employee>> structure = new ResponseStructute<>();
		if(emp.isEmpty()) {
			structure.setStatusCode(HttpStatus.NOT_FOUND.value());
			structure.setMessage("Data not found");
			return new ResponseEntity<ResponseStructute<List<Employee>>>(structure, HttpStatus.NOT_FOUND);
		} else {
			structure.setData(emp);
			structure.setMessage("success");
			structure.setStatusCode(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructute<List<Employee>>>(structure, HttpStatus.OK);
		}
	}
	
	@GetMapping("/specifiy-role")
	public ResponseEntity<ResponseStructute<List<Employee>>> getByRole(){
		List<Employee> emp = employeeRepository.getEmployeeByRole();
		ResponseStructute<List<Employee>> structute = new ResponseStructute<List<Employee>>();
		if(emp.size()>0) {
			structute.setData(emp);
			structute.setMessage("success");
			structute.setStatusCode(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructute<List<Employee>>>(structute, HttpStatus.OK);
		} else {
			structute.setMessage("not find data");
			structute.setStatusCode(HttpStatus.NOT_FOUND.value());
			return new ResponseEntity<ResponseStructute<List<Employee>>>(structute, HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	
	
}
