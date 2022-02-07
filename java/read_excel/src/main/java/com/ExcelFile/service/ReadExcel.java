package com.ExcelFile.service;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Iterator;

public class ReadExcel {
    public static ArrayList<ArrayList<String>> readExcel(String pathname, int sheetIndex) {
        ArrayList<ArrayList<String>> arr = new ArrayList<ArrayList<String>>();
        ArrayList<String> tempArr = new ArrayList<String>();

        String number = "NUMERIC";
        String str = "STRING";
        try
        {

            FileInputStream file = new FileInputStream(new File(pathname));

            //Create Workbook instance holding reference to .xlsx file
            XSSFWorkbook workbook = new XSSFWorkbook(file);

            //Get first/desired sheet from the workbook
            XSSFSheet sheet = workbook.getSheetAt(sheetIndex);

            //Iterate through each rows one by one
            Iterator<Row> rowIterator = sheet.iterator();
            while (rowIterator.hasNext())
            {
                Row row = rowIterator.next();
                //For each row, iterate through all the columns
                Iterator<Cell> cellIterator = row.cellIterator();

                while (cellIterator.hasNext())
                {
                    Cell cell = cellIterator.next();

                    //Check the cell type and format accordingly
                    if (cell.getCellType().toString() == number) {
                        tempArr.add(Double.toString(cell.getNumericCellValue()));

                    }
                    else if (cell.getCellType().toString() == str) {
                        tempArr.add(cell.getStringCellValue());
                    }
                }
                arr.add(tempArr);
                tempArr = new ArrayList<String>();
                //System.out.println("");
            }
            file.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return arr;
    }

}
