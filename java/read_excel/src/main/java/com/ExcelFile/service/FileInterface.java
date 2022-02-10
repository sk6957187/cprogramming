package com.ExcelFile.service;

import java.util.ArrayList;

public interface FileInterface {
    ArrayList<ArrayList<String>> readFile(String pathname, int index);
}
