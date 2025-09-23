package dsa;

import java.util.Arrays;

public class inssertionSort {
	public static void main(String[] args) {
		int[] arr = {5,4,1,3,6,2};
//		for(int i=0; i<arr.length; i++) {
//			for(int j=i; j>0; j--) {
//				if(arr[j] < arr[j-1]) {
//					int temp = arr[j];
//					arr[j] = arr[j-1];
//					arr[j-1] = temp;
//				} else{
//					break;
//				}
//			}
//		}
//		System.out.println(Arrays.toString(arr));
		
		for(int i=0; i<arr.length; i++) {
			int key = arr[i];
			int j=i-1;
			while(j>=0 && arr[j]>key) {
				arr[j+1] = arr[j];
				j--;
			}
			arr[j+1] = key;
		}
		System.out.println(Arrays.toString(arr));
	}
}
