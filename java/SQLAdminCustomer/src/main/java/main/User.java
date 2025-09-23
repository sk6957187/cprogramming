package main;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class User {
    public String save() {
        String sql = "INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)";
        try {
        	Connection conn = new SQLCreateConnection().SQLConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setString(1, "Sumit KUmar");
            stmt.setString(2, "sumit@gmail.com");
            stmt.setString(3, "Sumit@!23");
            stmt.setString(4, "9988776655");
            stmt.setString(5, "ABHC yuhij");

            int rowsInserted = stmt.executeUpdate();
            if (rowsInserted > 0) {
                return "User saved successfully!";
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return "Error occurred while saving the user.";
        }

        return "No rows inserted.";
    }
}
