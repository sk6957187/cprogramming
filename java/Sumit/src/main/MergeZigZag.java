package main;

import java.util.Arrays;

public class MergeZigZag {
	public static void main(String[] args) {
		int[] arr1 = {10,20,30};
		int[] arr2 = {1,2,3};
		int[] arr3 = new int[arr1.length + arr2.length];
		int j=0;
		int size = arr1.length > arr2.length ? arr2.length: arr1.length;
		int smallArr[] = arr1.length > arr2.length ? arr2:arr1;
		int bigArr[] = arr1.length > arr2.length ? arr1:arr2;
		for(int i=0; i<arr3.length; i++) {
			if(j<size) {
				arr3[i++]=smallArr[j];
				arr3[i] = bigArr[j];
			}else {
				arr3[i]=bigArr[j];
			}
			j++;
		}
		System.out.println(Arrays.toString(arr3));
	}
}
