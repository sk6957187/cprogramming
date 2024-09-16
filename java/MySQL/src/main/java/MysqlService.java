import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;

public class MysqlService {
    public ArrayList<HashMap<String, Object>> read(ResultSet rs) throws SQLException {
        ArrayList<HashMap<String, Object>> result = new ArrayList<>();
        HashMap<String, Object> temp;
        if (!rs.isBeforeFirst()) {
            System.out.println("No data found.");
        } else {
            while (rs.next()) {
                temp = new HashMap<>();
                temp.put("STUDENT_ID", rs.getInt(1));
                temp.put("STUDENT_NAME", rs.getString(2));
                result.add(temp);
            }
        }
        return result;
    }
    public ArrayList<HashMap<String, Object>> executeQuery(Connection con, String query) throws SQLException{
        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        return this.read(rs);
    }
    public void insertQuery(Connection con, String query) throws SQLException{
        Statement stmt = con.createStatement();
        stmt.executeUpdate(query);
    }
}
