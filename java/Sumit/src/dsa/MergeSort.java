package dsa;

import java.util.Arrays;

public class MergeSort {
	static void merge(int[] arr, int l, int h, int m) {
		int[] left = new int[m - l + 1];
		int[] right = new int[h - m];
		int x = 0;
		for (int i = l; i <= m; i++) {
			left[x++] = arr[i];
		}
		x = 0;
		for (int i = m + 1; i <= h; i++) {
			right[x++] = arr[i];
		}
		int k = l, i = 0, j = 0;
		while (i < left.length && j < right.length) {
			if (left[i] > right[j]) {
				arr[k++] = right[j++];
			} else {
				arr[k++] = left[i++];
			}
		}
		while (i < left.length) {
			arr[k++] = left[i++];
		}
		while (j < right.length) {
			arr[k++] = right[j++];
		}
	}

	static void sort(int arr[], int l, int h) {
		if (l < h) {
			int m = (l + h) / 2;
			System.out.println("l:"+l+" m:"+m);
			sort(arr, l, m);
			System.out.println("m:"+(m+1)+" h:"+h);
			sort(arr, m + 1, h);
			merge(arr, l, h, m);
		}
	}
	static void search(int[] arr, int ele) {
		int l=0, h=arr.length;
		int m = (l+h)/2;
		while(l<h) {
			if(arr[m]==ele) {
				System.out.println(ele+" is present at "+(m+1));
				return;
			} else if(arr[m]>ele){
				h=m-1;
			} else {
				l=m+1;
			}
		}
	}

	public static void main(String[] args) {
		int arr[] = { 25, 1, 5, 12, 16, 20, 3, 7, 9, 13, 30, 4 };
		sort(arr, 0, arr.length - 1);
		System.out.println(Arrays.toString(arr));
		search(arr, 12);	//here array pass in sorted form
		
	}
}
