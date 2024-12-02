package main;

public class Factorial {
	static int factorial(int fact,int n) {
		if(n==1) {
			return fact;
		}
		fact *= n;
		return factorial(fact,(n-1));
	}

	public static void main(String[] args) {
		int n=10;
		int fact = factorial(1,n);
		System.out.println(fact);
	}

}

