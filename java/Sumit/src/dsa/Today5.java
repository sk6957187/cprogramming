package dsa;

import java.util.Arrays;

public class Today5 {
	public static void main(String[] args) {
//		int[] arr = {1,4,7,2,9,5};
		int[] arr = {2,3,4,5,6,1};		//min=5
		int min = 0;
		int swap = 0;
		for(int i=0; i<arr.length; i++) {
			int key = arr[i];
			int j=i-1;
			while(j>=0 && arr[j]>key) {
				arr[j+1] = arr[j];
				j--;
				min++;
			}
			arr[j+1] = key;
			swap++;
			
		}
		System.out.println(Arrays.toString(arr));
		System.out.println("minmum iterate -> "+ min);
		System.out.println("minmum Swap ->" + swap );
	}
	
	
}
