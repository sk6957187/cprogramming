package com.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import model.StudentConfig;

@RestController
public class Controller {
	@GetMapping("/student")
	public String getStudent(@RequestParam int id, @RequestParam String name) {
		return "Id: "+id+"name: "+name;
	}
	
	@GetMapping("/get-student/{cls}/{rollno}")
	public String getStudentById(@PathVariable String cls, @PathVariable int rollno) {
		return "Class: "+cls+" Roll no.: "+rollno;
	}
	
	@GetMapping("/info")
	public String getInfo(@RequestHeader int token) {
		return "Token is "+token;
	}
	
	@PostMapping("/student")
	public String saveStudent(@RequestBody StudentConfig student) {
		System.out.println(student.toString());
		return student.toString();
	}
}
