package main;

import java.util.*;

public class Palindrome {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		String num =sc.nextLine();
		int n=num.length();
		System.out.println("Size "+num.length());
		String rev="";
		for(int i=n-1; i>=0; i--) {
			rev += num.charAt(i);
		}
		if(num.equals(rev)) {
			System.out.println("Yes");
		}
		else
			System.out.println("No");
		sc.close();
		

	}

}
