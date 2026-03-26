package com.jsp.CURDspring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.jsp.CURDspring.model.ResponseStructute;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler(IdNotFoundException.class)
	public ResponseEntity<ResponseStructute<String>> handleIdNotFoundException(IdNotFoundException exception){
		ResponseStructute<String> resp = new ResponseStructute<String>();
		resp.setStatusCode(HttpStatus.NOT_FOUND.value());
		resp.setMessage("Failure");
		resp.setData(exception.getMessage());
		
		return new ResponseEntity<ResponseStructute<String>>(resp,HttpStatus.NOT_FOUND);
		
	}
}
