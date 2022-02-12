package com.book.service;


import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public class CSVFileService  {
    public ArrayList<ArrayList<String>> readFile(String pathname, int index) {
        ArrayList<ArrayList<String>> arr = new ArrayList<ArrayList<String>>();
        ArrayList<String> tempArr = new ArrayList<String>();
        try {
            // Create an object of file reader
            // class with CSV file as a parameter.
            FileReader filereader = new FileReader(pathname);

            // create csvReader object and skip first Line
            CSVReader csvReader = new CSVReaderBuilder(filereader)
                    .withSkipLines(0)
                    .build();
            List<String[]> allData = csvReader.readAll();

            // print Data
            for (String[] row : allData) {
                for (String cell : row) {
                    tempArr.add(cell);
                }
                arr.add(tempArr);
                tempArr = new ArrayList<String>();
            }
            /*for (String[] row : allData) {
                for (String cell : row) {
                    System.out.print(cell + "\t");
                }
                System.out.println();
            }*/
        } catch (Exception e) {
            e.printStackTrace();
        }
        return arr;
    }
}
