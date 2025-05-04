package main;

import java.util.Scanner;

public class SpyNumber {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter number:- ");
		int n = sc.nextInt();
		int sum=0;
		int prod=1;
		while(n>0) {
			int remd=n%10;
			prod *= remd;
			sum = sum + remd;
			n = n/10;
		}
		if(sum == prod) {
			System.out.println("Spy number");
		} else {
			System.out.println("Not spy number");
		}

		
	}

}
