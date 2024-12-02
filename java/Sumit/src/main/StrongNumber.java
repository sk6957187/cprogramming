package main;

//Strong number --> 145 = 1! + 4! + 5!

public class StrongNumber {
	int factorial(int rem, int fact) {
		if(rem==1) {
			System.out.println("fact of rem "+fact);
			return fact;
		}
		fact = fact * rem;
		return factorial((rem-1),fact);
	}
	
	public static void main(String[] args) {
		StrongNumber sn = new StrongNumber();
		int n =145;
		int sum = 0;
		int temp = n;
		while(temp>0) {
			int rem = temp%10;
			int fact = sn.factorial(rem,1);
			sum += fact;
			temp = temp/10;
		}
		if(n==sum) {
			System.out.println(n+" is a Strong number");
		}
		else {
			System.out.println(n + " is Not a strong number");
		}
	}

}
