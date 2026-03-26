package com.jsp.CURDspring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jsp.CURDspring.model.Employee;



@Repository
public interface  EmployeeRepository  extends JpaRepository<Employee, Integer> {
	List<Employee> findBySalary(double slary);
	Optional<Employee> findByNameAndRole(String name, String role);
	List<Employee> findBySalaryGreaterThan(double salary);
	@Query("select e from Employee e where e.role= 'Developer'")
	List<Employee> getEmployeeByRole();
}
