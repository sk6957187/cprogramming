import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class OraclesqlConnection {

    public static void main(String args[]) {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            System.out.println("Driver loaded..");
            String url = "jdbc:oracle:thin:@Sumit11:1521:em";
            String username = "SUMIT";
            String password = "tiger";

            // Establish connection
            Connection con = DriverManager.getConnection(url, username, password);
            if (con != null) {
                System.out.println("Connection successful..");
            } else {
                System.out.println("Connection error..");
                return;
            }
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from Student");
            if (!rs.isBeforeFirst()) {
                System.out.println("No data found.");
            } else {
                while (rs.next()) {
                    System.out.println(rs.getInt("SID")+" "+rs.getString("SNAME")+" "+rs.getInt("AGE")+" "+rs.getDate("EDATE")  );

                }
            }
            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
