package main;

import java.util.ArrayList;

public class UniqueNumber {
	public static boolean isUniqueNum(int n) {
		int temp = n;
		ArrayList<Integer> arr= new ArrayList<>();
		while(temp>0) {
			int rem = temp%10;
			arr.add(rem);
			temp = temp/10;
		}
		while(n>0) {
			int rem = n%10;
			int flag = 0;
			for(int i=0; i<arr.size(); i++) {
				if(rem == arr.get(i)) {
					flag++;
				}
			}
			if(flag >= 2) {
				return false;
			}
			n = n/10;
		}
		
		return true;
	}
	public static void main(String[] args) {
		int num = 12364;
		boolean res = isUniqueNum(num);
		if(res) {
			System.out.println("Unique");
		} else {
			System.out.println("Not");
		}
	}
}
