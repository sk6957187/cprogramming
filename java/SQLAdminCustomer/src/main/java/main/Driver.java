package main;

import java.util.Scanner;

public class Driver {
	public static void main(String[] args) {
		boolean flag = true;
		Scanner sc = new Scanner(System.in);
		while(flag) {
			System.out.println("--------------------------");
			System.out.println("1. Admin \n 2. Customer ");
			System.out.print("Enter input:- ");
			int key = sc.nextInt();
			switch (key) {
			case 1:
				Admin admin = new Admin();
				String str = admin.dataSave();
				System.out.println(str);
				break;
			case 2:
				User user = new User();
				String str1 = user.save();
				System.out.println(str1);
				break;
			default:
				System.out.println("default");
				break;
			}
		}
	}

}
