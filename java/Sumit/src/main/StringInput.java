package main;

import java.util.Scanner;

public class StringInput {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		int n =sc.nextInt();
		sc.nextLine();
		String[] s1 = sc.nextLine().split(" ");
		int total=0;
		for(int i=0; i<n; i++) {
			total += Integer.parseInt(s1[i]);
		}
		System.out.println("total "+total);

	}

}
