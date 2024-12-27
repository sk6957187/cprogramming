package main;

import java.util.Arrays;

public class ArrayFreq {
	public static void main(String[] args) {
		int[] arr = {1,2,1,3,5,4,6,1,7,2,9,3,7};
		Arrays.sort(arr);
		for(int i=0; i<arr.length-1; i++) {
			int count = 1;
			for(int j=i+1; j<arr.length; j++) {
				if(arr[i]==arr[j]) {
					count++;
				}else {
					break;
				}
			}
			i = i+count-1;
			System.out.println(arr[i]+" is "+count+" times");
		}
		
		System.out.println("unique element:- ");
	}
}
