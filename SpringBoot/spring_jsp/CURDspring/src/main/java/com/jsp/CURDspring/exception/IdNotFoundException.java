package com.jsp.CURDspring.exception;

public class IdNotFoundException extends RuntimeException {
	@Override
	public String getMessage() {
		return "Id not found..............!!";
	}
	
}
