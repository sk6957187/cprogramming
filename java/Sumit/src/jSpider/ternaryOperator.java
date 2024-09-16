package jSpider;

public class ternaryOperator {
	public static void main(String[] args) { 
		int a=10, b=2, c=1, d=50;
		int res = (a<b) ? a:b;
		System.out.println("Smallest number in 2 numbers: "+res);
		res= (a<b && b<c) ? a:(b<c)? b:c ;
		System.out.println("Smallest number in 3 numbers: "+res);
		res = (a>b && a>c && a>d)? a:(b>c && b>d) ? b:(c>d) ? c:d;
		System.out.println("Biggest number in 4 numbers: " + res);
	}
}
