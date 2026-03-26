package main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class CRUDoperation {
	public static void main(String[] args) {
		String driver = "com.mysql.cj.jdbc.Driver";
		String url = "jdbc:mysql://localhost:3306/student";
		String user = "root";
		String pass = "Sumit@123";
		String query = "select * from studentdata";
//		String query = "Update studentdata set studentId  = 2 where studentName = 'Mohan'";
		Connection con = null;
		Statement stmt = null;

		
		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, user, pass);
			stmt = con.createStatement();
//			int res = stmt.executeUpdate(query);
//			if(res != 0) {
//				System.out.println("Data updated!");
//			}
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
		} finally {
			if(stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
			if(con != null) {
				try {
					con.close();
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
	}
}
