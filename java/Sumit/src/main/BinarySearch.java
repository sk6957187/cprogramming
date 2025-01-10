package main;

public class BinarySearch {
	public static int search(int[] arr, int key) {
		int l=0; 
		int h=arr.length-1;
		
		while(l<=h) {
			int mid = (l+h)/2;
			if(arr[mid] == key) {
				return mid;
			} else if(arr[mid] > key) {
				h=mid-1;
			} else {
				l=mid+1;
			}
		}
		return -1;
	}
	
	public static void main(String[] args) {
		int arr[] = {1,2,4,5,7,9,10,12,14};
		int key = 12;
		int res=-1;
		res = search(arr, key);
		if(res<0) {
			System.out.println(key+ "is not persent");
		} else {
			System.out.println(key+" is persent at "+(res+1));
		}
	}

}
