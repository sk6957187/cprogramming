package main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLCreateConnection {
	private String driver = "com.mysql.cj.jdbc.Driver";
	private String url = "jdbc:mysql://localhost:3306/arghay";
	private String username = "root";
	private String password = "Sumit@123";

	public Connection SQLConnection() {
		Connection connection = null;
		try {
			Class.forName(driver);
			connection = DriverManager.getConnection(url, username, password);
			System.out.println("Connection successful!");
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return connection;
	}
}
