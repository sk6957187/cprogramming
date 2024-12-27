package main;

public class TernaryOp {
	public static void main(String[] args) {
		int a = 9;
		int b = 3;
		int c = 4;
		int d = 7;
		 
		int res = (a>b && a>c && a>d) ? a : (b>c && b>d) ? b : (c>d) ? c:d;
		
		System.out.println("Biggest number: "+res);
	}
}
