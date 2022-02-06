package com.ExcelFile;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.FormulaEvaluator;
//import org.apache.poi.ss.usermodel.Row;


//package com.howtodoinjava.demo.poi;
//import statements
public class ReadExcelFileDemo {
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
                        //System.out.println(cell.getNumericCellValue());

                    }
                    else if (cell.getCellType().toString() == str) {
                        tempArr.add(cell.getStringCellValue());
//                        j++;
                        //System.out.println(cell.getStringCellValue());
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

    public static void main(String[] args)
    {
        ArrayList<ArrayList<String>> arr;
        int i = 0,j = 0;

        arr = readExcel("student.xls", 0);

        for(i=0; i<arr.size(); i++) {
            for (j=0; j<arr.get(i).size(); j++) {
                System.out.print(arr.get(i).get(j) + "\t\t");
            }
            System.out.println("");
        }
//        for(i = 0; i < arr.length; i++) {
//            for (j = 0; j < arr[i].length; j++) {
//                System.out.print(arr[i][j] + "\t\t");
//            }
//            System.out.println("");
//        }
    }
}
