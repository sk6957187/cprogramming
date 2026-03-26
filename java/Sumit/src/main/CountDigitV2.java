package main;

import java.util.HashMap;

public class CountDigitV2 {
	public static int count(int n) {
		if(n==0) {
			return 0;
		}
		return 1+count(n/10);
	}
	public static void main(String[] args) {
		int n=224434;
		int res = count(n);
		System.out.println(res);
	}
	
	
//	static int count=0;
//	public static void count(int n) {
//		
//		if(n==0) {
//			return;
//		}
//		count++;
//		count(n/10);
//	}
//	public static void main(String[] args) {
//		int n=1234;
//		count(n);
//		System.out.println(count);
//	}	
}





