package main;


public class MagicNum {
	public static void main(String[] args) {
		int n =97;
		int temp = n;
		while(true) {
			int sum =0;
			if(n<10) {
				break;
			}
			else {
				while(n>0) {
					int rem = n%10;
					sum += rem;
					n /= 10;
				}
				n = sum;
			}
		}
		if(n==1) {
			System.out.println(temp+" is a Magic Number.");
		}else {
			System.out.println(temp + " is not Magic Number.");
		}
	}
}
