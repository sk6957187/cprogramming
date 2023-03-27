package org.example.tables;

import java.sql.ResultSet;

public class Student {
    private Number studentId;
    private String studentName;
    private String percentage;

    public Student (ResultSet rs) {
        if (rs == null) {
            return;
        }
        try {
            studentId = rs.getInt("studentId");
            studentName = rs.getString("studentName");
            percentage = rs.getString("percentage");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public Number getStudentId() {
        return studentId;
    }

    public void setStudentId(Number studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getPercentage() {
        return percentage;
    }

    public void setPercentage(String percentage) {
        this.percentage = percentage;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + studentId +
                ", name='" + studentName + '\'' +
                ", percentage='" + percentage + '\'' +
                '}';
    }
}
