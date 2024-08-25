package main;

import java.util.Scanner;

public class SumOfTwoNumber
{
	public static void main(String args[]) {
		int x,y,sum;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the first number:-");
		x = sc.nextInt();
		System.out.println("Enter the second number:-");
		y = sc.nextInt();
		sum = x+y;
		sum = sum(x,y);
		System.out.println("The sum of two number "+x+ " & " +y+" is:- "+ sum);
		sc.close();
	}
	public static int sum(int a,int b) {
		int sum;
		sum = a+b;
		return sum;
	}
}