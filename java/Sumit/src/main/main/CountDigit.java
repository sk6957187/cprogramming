package main;

public class CountDigit {
	public static void main(String[] args) {
		int n = 12345;
		int count = 0;
		int countE=0;
		int countO = 0;
		while(n>0) {
			int rem = n%10;
			count++;
			if(rem%2==0) {
				countE++;
			}else {
				countO++;
			}
			n = n/10;
		}
		System.out.println("Total digit: "+count);
		System.out.println("Even digit: "+countE);
		System.out.println("Odd digit: "+countO);
	}
}
