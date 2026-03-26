package main;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Admin {
    public String dataSave() {
        String sql = "INSERT INTO Admin (name, mob_no, password) VALUES (?, ?, ?)";
        
        try {
        	Connection conn = new SQLCreateConnection().SQLConnection(); 
             PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, "Sumit Kumar");
            stmt.setString(2, "9876543210"); 
            stmt.setString(3, "pass123");

            int rowsInserted = stmt.executeUpdate();
            if (rowsInserted > 0) {
                return "Data inserted successfully!";
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return "Error occurred while inserting data.";
        }

        return "No rows inserted.";
    }

	
}
