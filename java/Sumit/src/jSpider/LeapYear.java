package jSpider;

import java.util.Scanner;

public class LeapYear {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		String str= "true";
		boolean b1 = Boolean.valueOf(str);
		boolean b2 = Boolean.parseBoolean(str);
		System.out.println(b1);
		System.out.println(b2);
	}

}
