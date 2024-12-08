package main;
import java.util.Scanner;
public class starpattern {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n=5;
		System.out.println("1. Window formate:-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				if(i==0 || i==n/2 || i==n-1 || j==0 || j==n/2 || j==n-1) {
					System.out.print("* ");
				}else {
					System.out.print("  ");
				}
			}
			System.out.println();
		}
		System.out.println("2. Smoking pattern:-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				if(i==j || i+j==n-1 || j==n/2 || i==n/2) {
					System.out.print("* ");
				}else {
					System.out.print("  ");
				}
			}
			System.out.println();
		}
		System.out.println("3. Cross pattern:-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				if(i==j || i+j==n-1) {
					System.out.print("  ");
				}else {
					System.out.print("* ");
				}
			}
			System.out.println();
		}
		System.out.println("4. Print 1/0 :-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				if(i%2==0 && j%2==0) {
					System.out.print("1 ");
				}
				else if(i%2!=0 && j%2!=0) {
					System.out.print("1 ");
				}
				else {
					System.out.print("0 ");
				}
			}
			System.out.println();
		}
		
	}
}
