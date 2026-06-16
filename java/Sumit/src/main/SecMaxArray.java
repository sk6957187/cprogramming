package main;

public class SecMaxArray {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
			int[] arr = {24,89,90,45,36,78,9,23,90};
			int max = Integer.MIN_VALUE;
			for (int element : arr) {
				max = Math.max(element,max);
			}

//			System.out.println(max);
			int secMax = Integer.MIN_VALUE;
			for (int element : arr) {
				if(element>secMax && element!=max) {
					secMax = element;
				}
			}
			System.out.println(secMax);
	}

}
