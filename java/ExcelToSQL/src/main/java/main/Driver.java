package main;

import java.sql.*;
import java.util.ArrayList;
import java.util.Scanner;

import org.apache.poi.ss.formula.atp.Switch;

public class Driver {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		boolean flag=true;
		
		do {
			System.out.println("-------------------------");
			System.out.println("1. set sql to excel. \n2. Excel to sql. \n3. Set sql to csv. "
					+ "\n4. csv to sql. \n5. Exit");
			System.out.println("Enter the choice:-");
			switch(sc.nextInt()){
				case 1:
					Excel excel = new Excel(); 
					String str = excel.loadInExcel();
					System.out.println(str);
				break;
				
				case 3:
					CssFile cssFile = new CssFile();
					String str1 = cssFile.loadInCSVfile();
					System.out.println(str1);
					break;
					
				case 5:
					flag=false;
					break;
					
				default:
					System.out.println("Wrong input..!!");
					break;
			}
		}while(flag);
		System.out.println("-----------programm end-------------");
		
		
	}
	

}
