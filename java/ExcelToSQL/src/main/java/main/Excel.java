package main;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class Excel {
	
	public void sqlToExcel() {
		
	}

    public String loadInExcel() {
    	
    	SQL sql = new SQL();
    	ArrayList<ArrayList<String>> data = sql.readSQL();
    	
    	
        String[] headers = {"SNO", "START_DATE", "USERID", "SUB", "TOPIC", "TOPIC_DETAILS", "COMPLETED", "ADDED_DATE", "UPDATE_TIME"};
        String fileName = "Daily_Report.xlsx";
        String filePath = System.getProperty("user.dir") + File.separator + fileName;

        File file = new File(filePath);
        Workbook workbook;
        Sheet sheet;

        try {
            // Open the existing file if it exists, otherwise create a new workbook
            if (file.exists()) {
                FileInputStream fileIn = new FileInputStream(file);
                workbook = new XSSFWorkbook(fileIn);
                sheet = workbook.getSheetAt(0);
            } else {
                workbook = new XSSFWorkbook();
                sheet = workbook.createSheet("Daily Report");
                // Create headers row
                Row headerRow = sheet.createRow(0);
                for (int i = 0; i < headers.length; i++) {
                    headerRow.createCell(i).setCellValue(headers[i]);
                }
            }

            // Read the existing data and check if we need to update or add new rows
            int rowCount = sheet.getPhysicalNumberOfRows();

            for (int i = 0; i < data.size(); i++) {
                ArrayList<String> rowData = data.get(i);
                String sno = rowData.get(0);
                String updateTime = rowData.get(8);
                boolean isUpdated = false;

                // Check if the SNO already exists and if UPDATE_TIME matches
                for (int j = 1; j < rowCount; j++) {
                    Row row = sheet.getRow(j);
                    if (row != null && row.getCell(0).getStringCellValue().equals(sno)) {
                        String existingUpdateTime = row.getCell(8).getStringCellValue();
                        if (!existingUpdateTime.equals(updateTime)) {
                            for (int k = 0; k < rowData.size(); k++) {
                                row.getCell(k).setCellValue(rowData.get(k));
                            }
                            isUpdated = true;
                            break;
                        } else {
                            isUpdated = true;
                            break;
                        }
                    }
                }

                // If SNO doesn't exist or UPDATE_TIME doesn't match, add new row
                if (!isUpdated) {
                    Row newRow = sheet.createRow(rowCount++);
                    for (int j = 0; j < rowData.size(); j++) {
                        newRow.createCell(j).setCellValue(rowData.get(j));
                    }
                }
            }

            // Save the updated Excel file
            try { 
            	FileOutputStream fileOut = new FileOutputStream(filePath);
                workbook.write(fileOut);
            }catch (FileNotFoundException e) {
            	e.printStackTrace();
			}

//            System.out.println("Excel file updated at: " + filePath);
            return "Excel file updated at: " + filePath;

        } catch (IOException e) {
            e.printStackTrace();
            return "Error updating Excel file.";
        }
    }
}
