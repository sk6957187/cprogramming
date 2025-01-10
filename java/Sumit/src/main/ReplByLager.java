package main;

//i/p: {5,10,3,18,7,16,8};   
//o/p: [18, 18, 18, -1, 16, -1, -1];


import java.util.Arrays;

public class ReplByLager {
	public static int[] replByLager(int[] arr) {
		int[] finalArr = new int[arr.length];
		for(int i=0; i<arr.length; i++) {
			int temp=arr[i];
			int index=i;
			for(int j=i+1; j<arr.length; j++) {
				if(temp<arr[j]) {
					index = j;
					temp=arr[j];
				}
			}
			if(index > i) {
				for(int j=i; j<=index; j++) {
					finalArr[j]=arr[index];
				}
			} else {
				finalArr[i]=-1;
			}
		}
		return finalArr;
	}

	public static void main(String[] args) {
		int[] arr = {5,10,3,18,7,16,8};  
		int[] rs = replByLager(arr);
		System.out.println(Arrays.toString(rs));
	}

}
