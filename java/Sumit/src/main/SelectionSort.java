package main;

import java.util.Arrays;

public class SelectionSort {
	public static void main(String[] args) {
		int arr[] = {5,4,2,6,1,3};
		for(int i=0; i<arr.length-1; i++) {
			int sIndex = i;
			for(int j=i+1; j<arr.length; j++) {
				if(arr[sIndex] > arr[j]) {
					sIndex = j;
				}
			}
			int temp = arr[i];
			arr[i] = arr[sIndex];
			arr[sIndex] = temp;
		}
		System.out.println(Arrays.toString(arr));
	}
}
