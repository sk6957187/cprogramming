package dsa;

public class BinarySearch {
	public static int binSearch(int[] arr, int n, int l, int s) {
		if(l < s) {
			return -1;
		}
		int mid = (l+s)/2;
		if(arr[mid] == n) {
			return mid;
		} else if(arr[mid] > n) {
			return binSearch(arr, n, mid-1, s);
		} else {
			return binSearch(arr, n, l, mid+1);
		}
		
		
	}
	
	public static void main(String[] args) {
		int[] arr = {1,2,3,4,5,6,7,8,9};
		int n = 10;
		int res = binSearch(arr, n, arr.length-1, 0);
		if(res > 0) {
			System.out.println("number "+ n +" is find at: "+res);
		} else {
			System.out.println("number "+n+" is not find.");
		}
	}
}
