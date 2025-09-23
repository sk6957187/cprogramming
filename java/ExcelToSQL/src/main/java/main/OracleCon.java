package main;

import java.sql.*;

public class OracleCon {
	private final String driver = "oracle.jdbc.driver.OracleDriver";
	private final String url = "jdbc:oracle:thin:@Sumit11:1521:xe";
	private final String username = "System";
	private final String password = "tiger";
	
	public Connection createConnection() {
		try {
			Class.forName(driver);
			Connection con = DriverManager.getConnection(url, username, password);
			System.out.println("Connection build..!!");
			return con;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
    
}
