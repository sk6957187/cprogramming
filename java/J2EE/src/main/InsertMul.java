package main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class InsertMul {

	public static void main(String[] args) {
		String driver = "com.mysql.cj.jdbc.Driver";
		String url = "jdbc:mysql://localhost:3306/student";
		String user = "root";
		String pass = "Sumit@123";
		String query = "select * from studentdata";
		Statement stmt = null;
		Connection con  = null;
		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, user, pass);
			stmt = con.createStatement();
			stmt.executeQuery(query);
			ResultSet rs = stmt.executeQuery(query);
			System.out.println("SID \t SNAME \t PERCENTAGE");
			if (rs==null) {
              System.out.println("File is empty...");
			}
			while (rs.next()) {
				System.out.println(rs.getInt(1)
						+ "\t " + rs.getString(2)
						+ "\t " + rs.getString(3) );
			}
			
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

}
