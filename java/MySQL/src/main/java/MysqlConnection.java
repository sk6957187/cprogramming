import java.sql.*;

public class MysqlConnection {
    public static void main(String[] args) {
        try {
            String driver = "com.mysql.cj.jdbc.Driver";
            String url = "jdbc:mysql://localhost:3306/student";
            String username = "root";
            String password = "Sumit@123";


            Class.forName(driver);
            Connection con = DriverManager.getConnection(url, username, password);

            Statement stmt = ((java.sql.Connection) con).createStatement();
            ResultSet rs = stmt.executeQuery("select * from Studentdata");
            // Process the result set
            if (rs==null) {
                System.out.println("File is empty...");
            }
            while (rs.next()) {
                System.out.println(rs.getInt(1)
                        + "  " + rs.getString(2)
                        + "  " + rs.getString(3) );
            }
            // Close connections
            rs.close();
            stmt.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }
}
