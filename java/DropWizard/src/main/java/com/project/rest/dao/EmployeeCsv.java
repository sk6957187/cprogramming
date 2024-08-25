package com.project.rest.dao;

import com.project.rest.representations.Employee;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class EmployeeDB {
    static HashMap<Integer, Employee> employees = new HashMap<>();
//    static{
//        employees.put(1, new Employee(1, "Lokesh", 20, "2023-04-01"));
//        employees.put(2, new Employee(2, "John", 21, "2023-04-01"));
//        employees.put(3, new Employee(3, "Mohan", 22, "2023-04-01"));
//    }
    public EmployeeDB() {}
    public ArrayList<Employee> getEmployees(){
        return new ArrayList<>(employees.values());
    }
    private ArrayList<ArrayList<String>> getEmployeeData() {
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        ArrayList<String> fileData = new ArrayList<>();
        ArrayList<String> row;
        String csvFile = "A:/Sumit/Sumit/study/workspace/cprogramming-2/java/DropWizard/meta-data/test-data/employee.csv";
        String line = "";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                fileData.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        data = this.convertFileDataToEmployeeData(fileData);
        return data;
    }
    private ArrayList<ArrayList<String>> getEmployeeDataXlsx() {
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        ArrayList<String> fileData = new ArrayList<>();
        ArrayList<String> row;
        String csvFile = "A:/Sumit/Sumit/study/workspace/cprogramming-2/java/DropWizard/meta-data/test-data/employee1.xlsx";
        String line = "";
        File file = new File(csvFile);
        try {
            FileInputStream fis = new FileInputStream(file);
            Workbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheetAt(0);
            for(Row sheetRow: sheet){
                row = new ArrayList<>();
                for(Cell cell: sheetRow){
                    switch (cell.getCellType()) {
                        case STRING:
                            System.out.print(cell.getStringCellValue() + "\t");
                            row.add(cell.getStringCellValue());
                            break;
                        case NUMERIC:
                            System.out.print(cell.getNumericCellValue() + "\t");
                            row.add(String.valueOf(Math.round(cell.getNumericCellValue())));
                            break;
                        case BOOLEAN:
                            System.out.print(cell.getBooleanCellValue() + "\t");
                            row.add(String.valueOf(cell.getBooleanCellValue()));
                            break;
                        default:
                            System.out.print("blank \t");
                            break;
                    }
                }
                if (!row.isEmpty()) {
                    fileData.add(String.join(",", row));
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        data = this.convertFileDataToEmployeeData(fileData);
        return data;
    }
    private ArrayList<ArrayList<String>> convertFileDataToEmployeeData(ArrayList<String> fileData) {
        ArrayList<ArrayList<String>> employeeData = new ArrayList<>();
        ArrayList<String> row;
        for (String fileLine: fileData) {
            String[] row1 = fileLine.split(",");
            row = new ArrayList<>();
            row.addAll(Arrays.asList(row1));
            employeeData.add(row);
        }
        return employeeData;
    }
    public void update() {
        employees = new HashMap<>();
        ArrayList<ArrayList<String>> employeeData = this.getEmployeeDataXlsx();
//        ArrayList<ArrayList<String>> employeeData = this.getEmployeeData();
//        employees.put(1, new Employee(1, "Lokesh", 20, "2023-04-01"));
//        employees.put(2, new Employee(2, "John", 21, "2023-04-01"));
//        employees.put(3, new Employee(3, "Mohan", 22, "2023-04-01"));
        String s_no, name, age, date;
        Employee employee;
        if(employeeData != null) {
            for (ArrayList<String> row: employeeData) {
                if (row == null) {
                    continue;
                }
                if (row.size() <= 3) {
                    continue;
                }
                s_no = row.get(0);
                name = row.get(1);
                age = row.get(2);
                date = row.get(3);
                employee = new Employee(s_no, name, age, date);
                employees.put(employee.getPersonId(), employee);
            }
        }
    }
    public Employee getEmployee(Integer id){
        return employees.get(id);
    }

    public void updateEmployee(Integer id, Employee employee){
        employees.put(id, employee);
    }

    public void removeEmployee(Integer id){
        employees.remove(id);
    }
}
