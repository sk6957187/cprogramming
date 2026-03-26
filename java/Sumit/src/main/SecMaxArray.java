package main;

public class SecMaxArray {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
			int[] arr = {24,89,90,45,36,78,9,23,90};
			int max = Integer.MIN_VALUE;
			for(int i= 0; i<arr.length; i++) {
				max = Math.max(arr[i],max);
			}
			
//			System.out.println(max);
			int secMax = Integer.MIN_VALUE;
			for(int i = 0; i<arr.length; i++) {
				if(arr[i]>secMax && arr[i]!=max)
						secMax = arr[i];
			}
			System.out.println(secMax);
	}

}
