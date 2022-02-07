package com.ExcelFile;

import com.ExcelFile.service.ReadExcel;

import java.util.ArrayList;

//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.FormulaEvaluator;
//import org.apache.poi.ss.usermodel.Row;


//package com.howtodoinjava.demo.poi;
//import statements
public class ReadExcelFileDemo {

    public static void main(String[] args)
    {
        ArrayList<ArrayList<String>> arr;
        int i = 0,j = 0;

        arr = ReadExcel.readExcel("student.xls", 0);

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
