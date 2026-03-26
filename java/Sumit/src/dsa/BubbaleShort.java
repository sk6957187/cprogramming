package dsa;

import java.util.Arrays;

public class BubbaleShort {
	public static void main(String[] args) {
		int[] arr = {10,5,3,2,4,9,7,1};
		int a=0;
		for(int i=0; i<arr.length - 1; i++) {
			for(int j=0; j<arr.length - i -1; j++) {
				if(arr[j] > arr[j+1]) {
					int temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
				}
			}
			System.out.println(a++ +"->"+Arrays.toString(arr));
		}
		System.out.println(Arrays.toString(arr));
	}
}
