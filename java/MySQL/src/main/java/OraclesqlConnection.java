import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

public class OraclesqlConnection {



    public static void main(String args[]) {
        MysqlService mysqlService = new MysqlService();
        ArrayList<HashMap<String, Object>> result;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            System.out.println("Driver loaded..");
            String url = "jdbc:oracle:thin:@Sumit11:1521:xe";
            String username = "System";
            String password = "tiger";

            // Establish connection
            Connection con = DriverManager.getConnection(url, username, password);
            if (con != null) {
                System.out.println("Connection successful..");
            } else {
                System.out.println("Connection error..");
                return;
            }
            result = mysqlService.executeQuery(con,"select * from employee");
            System.out.println(result);
            //mysqlService.insertQuery(con, "INSERT INTO student (STUDENT_ID, STUDENT_NAME) VALUES (6, 'Amit Kumar')");
            //result = mysqlService.executeQuery(con,"select * from Student");
            System.out.println(result);
            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
