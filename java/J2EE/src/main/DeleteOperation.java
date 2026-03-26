package main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DeleteOperation {

	public static void main(String[] args) {
		String driver = "com.mysql.cj.jdbc.Driver";
		String url = "jdbc:mysql://localhost:3306/student";
		String user = "root";
		String pass = "Sumit@123";
		Statement stmt = null;
		Connection conn= null;
		String query = "delete from studentData where Studentid = 2";
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url,user,pass);
			stmt = conn.createStatement();
			int n = stmt.executeUpdate(query);
			if(n>0) {
				System.out.println("record delete!!");
			} else {
				System.out.println("record not available!!");
			}
			
		} catch(ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}  finally {
			if(stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
			if(conn != null) {
				try {
					conn.close();
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
	}

}
