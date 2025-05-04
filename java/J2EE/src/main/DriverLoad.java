package main;

import java.sql.*;

public class DriverLoad {

	public static void main(String[] args) {
		
        try {
        	String driver = "com.mysql.cj.jdbc.Driver";
            String url = "jdbc:mysql://localhost:3306/student"; // Database name
            String username = "root";
            String password = "Sumit@123";
            
            Class.forName(driver);
            System.out.println("Driver loaded successfully!");
            Connection con = DriverManager.getConnection(url, username, password);
            System.out.println("Connection done!");
//            Statement stmt = con.createStatement();
//            String query = "select * from Studentdata";
//            ResultSet rs = stmt.executeQuery(query);
//            System.out.println("Table data:- ");
//            System.out.println(rs);
            con.close();
        } catch(Exception e) {
        	e.printStackTrace();
        }
	}

}
