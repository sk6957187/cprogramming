package com.ExcelFile.service;

import java.util.ArrayList;

public interface FileInterface {
   public ArrayList<ArrayList<String>> readFile(String pathname, int index);
}
