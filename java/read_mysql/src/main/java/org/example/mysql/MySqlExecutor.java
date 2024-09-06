package org.example.mysql;

import org.example.tables.Student;

import java.util.ArrayList;

public class MySqlExecutor {
    private final MySqlCredential mySqlCredential;
    private final String hitDb;
    public MySqlExecutor(MySqlCredential mySqlCredential) {
        this.mySqlCredential = mySqlCredential;
        this.hitDb = mySqlCredential.getBaseUrl() + "/student??autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true";
    }
    public ArrayList<Student> getStudentData(MySqlExecutor mySqlExecutor) {
        String query = "SELECT * FROM studentdata;";
        MySqlConnection mySqlConnection = new MySqlConnection(this.hitDb, mySqlCredential);
        mySqlConnection.Connect();
        ArrayList<Student> result = mySqlConnection.readStudentData(query);
        mySqlConnection.close();
        return result;
    }
}
