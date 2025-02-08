package main;

public class Practice {
	
	public static void main(String[] args) {
		int[] arr = {30, 35,35,5,10};
		
		for(int i=0;i<arr.length-1; i++) {
			int temp =arr[i];
			boolean flag = true;
			for(int j=i+1; j<arr.length; j++) {
				if(temp <= arr[j]) {
					flag = false;
					break;
				}
			}
			if(flag == true) {
				System.out.println(temp + " ");
			}
		}
		System.out.print(arr[arr.length-1]);
	}
}