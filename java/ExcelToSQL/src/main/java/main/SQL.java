package main;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;


public class SQL {
	public ArrayList<ArrayList<String>> readSQL(){
		OracleCon oc = new OracleCon();
		Connection conn = oc.createConnection();
		ArrayList<ArrayList<String>> data = new ArrayList<>();
		try {
			if(conn != null) {
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery("select * from daily_report where deleted = 'NO' order by sno desc");
				int a=0;
				while(rs.next() && a++ <= 20) {
					ArrayList<String> row = new ArrayList<>();
					row.add(String.valueOf(rs.getInt("SNO")));
					row.add(rs.getString("START_DATE"));
					row.add(rs.getString("USERID"));
					row.add(rs.getString("SUB"));
					row.add(rs.getString("TOPIC"));
					row.add(rs.getString("TOPIC_DETAILS"));
		            row.add(rs.getString("COMPLETED"));
		            row.add(String.valueOf(rs.getDate("ADDED_DATE")));
		            row.add(String.valueOf(rs.getTimestamp("UPDATE_TIME")));
		            data.add(row);
				}
			}else {
				System.out.println("Connection error..");
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	
	}

}
