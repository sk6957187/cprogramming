package main;

public class ParfectNumber {
	public static void main(String[] args) {
		int n=6 ;
		int sum=0;
		int prod=1;
		for(int i=1; i<=n/2; i++) {
			if(n%i==0) {
				sum = sum+ i;
			}
		}
		if(sum == n) {
			System.out.println(n+" is a parfect number.");
		}
		else {
			System.out.println(n+" is not parfect number.");
		}
	}
}
