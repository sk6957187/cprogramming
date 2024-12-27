package main;

// 1234567 -> 1+2+3+4+5+6+7 = 28 -> 2+8 =10 ->1+0 = 1 (result in single digit.)
// 283 -> 2+8+3 = 13 ->1+3 = 4
public class SumOfDigitInSingleDigt {
	public static void main(String[] args) {
		int n=283; 
		int sum =0;
		while(true) {
			sum = 0 ;
			if(n<10) {
				sum += n;
				break;
			}
			else{
				while(n>0) {
					int rem = n%10;
					sum = sum + rem;
					n /= 10;
				}
				n = sum;
			}
		}
		System.out.println(sum);
	}
}
