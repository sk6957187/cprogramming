package main;

public class checkSortArrUseRecursion {
	static boolean check(int n, int[] arr) {
		if(n==0) {
			return true;
		}
		boolean res = check(n-1, arr); 
		if(res == true ) {
			if(arr[n]>arr[n-1]) {
				return true;
			} else {
				return false;
			}
		}else {
			return false;
		}
	}
	
	public static void main(String[] args) {
		int arr[] = {2,5,7,9,11,90,909};
		int n = arr.length-1;
		boolean res= check(n,arr); 
		boolean res1 = check1(n,arr,0);
		System.out.println(res);
	}
	
	static boolean check1(int n, int[]arr, int i) {
		if(i == n)
			return true;
		if(arr[i]>arr[i+1])
			return false;
		return check1(n,arr,i+1);
	}
	
}
