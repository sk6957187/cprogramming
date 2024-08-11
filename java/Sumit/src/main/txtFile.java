package main;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class txtFile {
	public static void main(String[] args) {
		
		String filePath = "C:\\Users\\SUMIT KUMAR\\OneDrive\\Desktop\\target.txt";
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
}
