package com.project.mvc.model;

public class Employee {private String personId;
    private String name;
    private String age;
    private String recordDate;

    public Employee() {

    }

    public Employee(String PersonId, String Name, String Age, String recordDate) {
        this.personId = PersonId;
        this.name = Name;
        this.age = Age;
        this.recordDate = recordDate;
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "personId='" + personId + '\'' +
                ", name='" + name + '\'' +
                ", age='" + age + '\'' +
                ", recordDate='" + recordDate + '\'' +
                '}';
    }
}