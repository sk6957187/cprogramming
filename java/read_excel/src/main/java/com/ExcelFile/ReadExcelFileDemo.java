package com.ExcelFile;

import com.ExcelFile.service.ReadExcel;

import java.util.ArrayList;
import java.util.Scanner;

//import statements
public class ReadExcelFileDemo {
    private static int searchIndex(ArrayList<ArrayList<String>> arr, String name) {
        int matchedIndex = -1;
        if (name == null || arr == null || arr.size() <= 1) {
            return -1;
        }
        for (int i = 1; i < arr.size(); i++) {
            for (int j = 0; j < arr.get(i).size(); j++) {
                if (name.equals(arr.get(i).get(j))) {
                    matchedIndex = i;
                    break;
                }
            }
        }
        return matchedIndex;
    }
    public static void main(String[] args) {
        ArrayList<ArrayList<String>> arr;
        int i = 0, j = 0;
        int matchedIndex;
        Scanner sc = new Scanner(System.in);
        int age;
        System.out.print("Enter name: ");
        String name = sc.nextLine();

        arr = ReadExcel.readExcel("student.xls", 0);
        matchedIndex = searchIndex(arr, name);
        if (arr.size() > 0) {
            for (j = 0; j < arr.get(i).size(); j++) {
                System.out.print(arr.get(i).get(j) + "\t\t");
            }
        }
        System.out.println("");
        if (arr.size() > matchedIndex && matchedIndex >= 0) {
            for (j = 0; j < arr.get(matchedIndex).size(); j++) {
                System.out.print(arr.get(matchedIndex).get(j) + "\t\t");
            }
        } else {
            for(i=1; i<arr.size(); i++) {
                for (j=0; j<arr.get(i).size(); j++) {
                    System.out.print(arr.get(i).get(j) + "\t\t");
                }
                System.out.println("");
            }
        }
    }
}
