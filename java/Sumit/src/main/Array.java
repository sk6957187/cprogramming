package main;

import java.util.Arrays;
import java.util.Scanner;

public class Array {

	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		int[] arr;
		System.out.print("Enter no.of element: ");
		arr = new int[scan.nextInt()];
		System.out.println("Enter "+arr.length+" array element:");
		for(int i=0; i<arr.length; i++) {
			arr[i] = scan.nextInt();
		}
		System.out.println("Enter element:");
		for(int i=0; i<arr.length; i++) {
			System.out.print(arr[i]+" ");
		}
		System.out.println();
		int sm=0;
		for(int data : arr) {
			sm = sm + data;
		}
		System.out.println("Sum = "+sm);
		Arrays.sort(arr);
		for(int a: arr) {
			System.out.print(a+" ");
		}
		System.out.println();
		
		scan.close();
		
	}

}
