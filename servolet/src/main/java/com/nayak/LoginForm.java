package com.nayak;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class LoginForm extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		 
		res.setContentType("text/html");
		Database database = new Database();

		String name  = req.getParameter("name1");
		String email = req.getParameter("email1");
		
		String modifiedName = database.name(name);
		
		PrintWriter out = res.getWriter();
		out.println("<!DOCTYPE html>");
		out.println("<html>");
		out.println("<body>");
		out.println("<h2 style='color: red'>Submit form details</h2>");
		out.println("My name is: " + name + "<br/>");
		out.println("My email is: " + email + "<br/>");
		out.println("Modified Name: " + modifiedName);
		out.println("</body>");
		out.println("</html>");

	}
	
}
