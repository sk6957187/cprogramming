package main;

import java.util.Scanner;

public class firstPrimeNum {
	public static boolean isPrime(int n) {
		for(int i=2; i<=n/2; i++) {
			if(n%i==0) {
				return false;
			}
		}
		return true;
	}
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter number: ");
		int n = sc.nextInt();
		int count =0;
		int i=3;
		System.out.println(2);
		while(1>0) {
			boolean res = isPrime(i);
			i+= 2 ;
			if(res) {
				System.out.println(i);
				count++;
			}
			if(count >= n-1) {
				break;
			}
			i+= 2 ;
		}
		
	}

	

}

 