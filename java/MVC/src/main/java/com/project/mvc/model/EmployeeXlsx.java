package com.project.mvc.model;

import com.project.mvc.MvcConfiguration;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;

public class EmployeeXlsx extends EmployeeDB{
    private final MvcConfiguration mvcConfiguration;
    public EmployeeXlsx(MvcConfiguration mvcConfiguration) {
        this.mvcConfiguration=mvcConfiguration;
    }

    public ArrayList<ArrayList<String>> getEmployeeDataXlsx(){
        ArrayList<ArrayList<String>> data = new ArrayList<>();
        ArrayList<String> fileData = new ArrayList<>();
        ArrayList<String> row;
        String xlsxFilePath = mvcConfiguration.getEmployeeXlsxFilePath();
        String line = "";
        File file = new File(xlsxFilePath);
        try{
            FileInputStream fis = new FileInputStream(file);
            XSSFWorkbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheetAt(0);// Read from sheetName
            for(Row sheetRow: sheet){
                row = new ArrayList<>();
                for(Cell cell: sheetRow){
                    switch (cell.getCellType()) {
                        case STRING:
                            System.out.print(cell.getStringCellValue() + "\t");
                            row.add(cell.getStringCellValue());
                            break;
                        case NUMERIC:
                            if (DateUtil.isCellDateFormatted(cell)) {
                                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                                row.add(dateFormat.format(cell.getDateCellValue()));
                                System.out.print(dateFormat.format(cell.getDateCellValue()));
                            } else {
                                row.add(String.valueOf(Math.round(cell.getNumericCellValue())));
                                System.out.print(Math.round(cell.getNumericCellValue()) + "\t");
                            }
                            //row.add(String.valueOf(Math.round(cell.getNumericCellValue())));
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
            throw new RuntimeException(e);
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
        this.updateEmployeeByData(employeeData);
    }

}
