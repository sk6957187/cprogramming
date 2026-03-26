import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

public class MysqlConnection {
    public static void main(String[] args) {
        MysqlService mysqlService = new MysqlService();
        ArrayList<HashMap<String, Object>> result;
        try {
        	syso
            String driver = "com.mysql.cj.jdbc.Driver";
            String url = "jdbc:mysql://localhost:3306/studentdata";
            String username = "root";
            String password = "Sumit@123";


            Class.forName(driver);
            Connection con = DriverManager.getConnection(url, username, password);
//            Statement stmt = con.createStatement();
            result = mysqlService.executeQuery(con,"select * from Studentdata");
            System.out.println("Table data:- ");
            System.out.println(result);
//            Statement stmt = con.createStatement();
//            ResultSet rs = stmt.executeQuery("select * from Studentdata");
//            if (rs==null) {
//                System.out.println("File is empty...");
//            }
//            while (rs.next()) {
//                System.out.println(rs.getInt(1)
//                        + "  " + rs.getString(2)
//                        + "  " + rs.getString(3) );
//            }
//
//            rs.close();       // Close connections
//            stmt.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }
}
