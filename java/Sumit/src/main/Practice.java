package main;

import java.util.HashMap;
import java.util.Scanner;

public class Practice {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		if((n%4==0 && n%400==0) || n%100!=0) {
			System.out.println(n);
		}
		else
			System.out.println("not");
	}

}
