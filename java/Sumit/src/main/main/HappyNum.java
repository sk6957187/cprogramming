package main;

public class HappyNum {
	public static void main(String[] args) {
		int n =94;
		int temp = n;
		while(true) {
			int sum =0;
			if(n<10) {
				break;
			}
			else {
				while(n>0) {
					int rem = n%10;
					sum += rem*rem;
					n /= 10;
				}
				n = sum;
			}
		}
		if(n==1 || n==7) {
			System.out.println(temp+" is a Happy Number.");
		}else {
			System.out.println(temp + " is not Happy Number.");
		}
	}
	
}
