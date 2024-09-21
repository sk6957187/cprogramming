package main;

import java.util.Scanner;

public class CharInput {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter value.");
		char ch = sc.next().charAt(0);
		System.out.println("Value: "+ch);
	}

}
