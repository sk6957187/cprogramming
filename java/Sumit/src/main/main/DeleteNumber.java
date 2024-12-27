package main;

import java.util.*;

public class DeleteNumber {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		System.out.print("Enter number of element:- ");
		int n = sc.nextInt();
		int[] arr = new int[n];
		for(int i=0; i<n; i++){
			arr[i] = sc.nextInt();
		}
		int del = sc.nextInt();
		deletNumber(arr, del);
		sc.close();
		return;

	}

	private static void deletNumber(int[] arr, int del) {
		int len = arr.length;
		//Arrays.sort(arr);
		int count =0;
		for(int i=0; i<len; i++) {
			if(arr[i]==del)
				count++;
			else
				System.out.print(arr[i]+" ");
		}
		System.out.println("Length:- "+ (len - count));
//		int tempArrSize = len - count;
//		int[] tempArr = new int[tempArrSize];
//		int j=0;
//		for(int i=0; i<len; i++) {
//			if(arr[i]!=del) {
//				tempArr[j]=arr[i];
//				j++;
//			}
//		}
//		System.out.println("Number of new array elements:- "+ tempArrSize);
//		for(int a: tempArr) {
//			System.out.print(a+" ");
//		}
		
		
	}

}
