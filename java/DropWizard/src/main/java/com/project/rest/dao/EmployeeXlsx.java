package com.project.rest.dao;

import com.project.rest.MainConfiguration;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class EmployeeXlsx extends EmployeeDB {
//    static{
//        employees.put(1, new Employee(1, "Lokesh", 20, "2023-04-01"));
//        employees.put(2, new Employee(2, "John", 21, "2023-04-01"));
//        employees.put(3, new Employee(3, "Mohan", 22, "2023-04-01"));
//    }
    private final MainConfiguration mainConfiguration;
    public EmployeeXlsx(MainConfiguration mainConfiguration) {
        this.mainConfiguration = mainConfiguration;
    }

    private ArrayList<ArrayList<String>> getEmployeeDataXlsx() {
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        ArrayList<String> fileData = new ArrayList<>();
        ArrayList<String> row;
        String csvFile = mainConfiguration.getEmployeeXlsxFilePath();
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
                            System.out.print(Math.round(cell.getNumericCellValue()) + "\t");
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
            fis.close();
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
        ArrayList<ArrayList<String>> employeeData = this.getEmployeeDataXlsx();
//        ArrayList<ArrayList<String>> employeeData = this.getEmployeeData();
//        employees.put(1, new Employee(1, "Lokesh", 20, "2023-04-01"));
//        employees.put(2, new Employee(2, "John", 21, "2023-04-01"));
//        employees.put(3, new Employee(3, "Mohan", 22, "2023-04-01"));
        this.updateEmployeeByData(employeeData);
    }

}
