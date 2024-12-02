package com.ExcelFile;

import com.ExcelFile.service.ReadCSV;
import com.ExcelFile.service.ReadExcel;

import java.util.ArrayList;
import java.util.Date;
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
                    System.out.println(i);
                    matchedIndex = i;
                    break;
                }
            }
        }
        return matchedIndex;
    }

    public static void printFullList(ArrayList<ArrayList<String>> arr) {
        if (arr != null) {
            for (int i = 0; i < arr.size(); i++) {
                for (int j = 0; j < arr.get(i).size(); j++) {
                    System.out.print(arr.get(i).get(j) + "\t\t");
                }
                System.out.println("");
            }
        }
    }
    public static void main(String[] args) {
        ArrayList<ArrayList<String>> arr = new ArrayList<ArrayList<String>>();
        int i = 0, j = 0;
        int x = 0;
        String name, y;
        int matchedIndex;
        Scanner sc = new Scanner(System.in);
        ReadCSV readCSV = new ReadCSV();
        ReadExcel readExcel = new ReadExcel();
        if (args.length >= 1) {
            if (args[0] == "xls") {
                arr = readExcel.readFile("student.xls", 0);
            } else {
                arr = readCSV.readFile("student.csv", 0);
            }
        } else {
            arr = readCSV.readFile("student.csv", 0);
        }

        boolean isContinue = true;

        /*matchedIndex = searchIndex(arr, name);
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
        }*/
        /*else {
            for (i = 1; i < arr.size(); i++) {
                for (j = 0; j < arr.get(i).size(); j++) {
                    System.out.print(arr.get(i).get(j) + "\t\t");
                }
                System.out.println("");
            }
        }*/
        while (isContinue) {
            System.out.println("");
            System.out.println("1. Print full list: ");
            System.out.println("2. Search by name: ");
            System.out.println("3. End the program");
            y = sc.nextLine();
            try {
                x = Integer.parseInt(y);
            } catch (Exception e) {}

            switch (x) {
                case 1:
                    printFullList(arr);
                    break;

                case 2: {
                    System.out.print("Enter name: ");
                    name = sc.nextLine();
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
                    }
                    break;
                }
                case 3:
                    isContinue = false;
                    break;
                default:
                    System.out.println("Invalid choice: " + x + ":" + y);
            }
        }
    }
}
