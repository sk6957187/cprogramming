package main;

public class MissingElement {
	public static boolean isMissing(int n, int[] x) {
		for(int i=0; i<x.length-1; i++) {
			if(x[i] == n) {
				return false;
			}
		}
		return true;
	}
	
	public static void main(String[] args) {
		int x[] = {1,3,2,8,4};
		int big=x[0], small=x[0];
		for(int i=1; i<x.length-1; i++) {
			if(x[i] < small) {
				small = x[i];
			}
			if(x[i] > big) {
				big = x[i];
			}
		}
		for(int i=small; i<=big; i++) {
			boolean res = isMissing(i,x);
			if(res == true) {
				System.out.println(i);
			}
		}
	}
}
