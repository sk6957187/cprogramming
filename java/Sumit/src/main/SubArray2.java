package main;
//Find the pair of element when sum is 10
public class SubArray2 {
	public static void subArray(int[] arr, int target) {
		int l=0; int h=arr.length-1;
		while(l<h) {
			if(arr[l] + arr[h] == target) {
				System.out.println(arr[l]+" "+arr[h]+",");
				l++;
				h--;
			} else if(arr[l] + arr[h] > target) {
				h--;
			} else {
				l++;
			}
		}
	}
	public static void main(String[] args) {
		int arr[] = {0,2,2,2,3,4,5,5,5,6,8,8,10,11};
		int target =10;
		subArray(arr, target);
	}
}
