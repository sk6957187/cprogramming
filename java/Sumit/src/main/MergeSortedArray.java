package main;

import java.util.Arrays;

public class MergeSortedArray {
	public static void main(String[] args) {
		int[] arr1 = {1,4,5,7,10};
		int[] arr2 = {2,3,4,6,8,9,10};
		int[] arr3 = new int[arr1.length + arr2.length];
		int m=0, n=0, k=0;
		while(m < arr1.length && n < arr2.length) {
			if(arr1[m] < arr2[n]) {
				arr3[k++] = arr1[m++];
			} else {
				arr3[k++] = arr2[n++];
			}
		}
		while(m < arr1.length) {
			arr3[k++] = arr1[m++];
		}
		while(n < arr2.length) {
			arr3[k++] = arr2[n++];
		}
		
		System.out.println(Arrays.toString(arr3));
	}
}
