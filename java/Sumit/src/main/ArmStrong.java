package main;

//ArmStrong Num.--> 153, no. of digit is 3 then 1^3 + 5^3 + 3^3 = 153

public class ArmStrong {
	private static boolean isArmStr(int n) {
		int temp=n;
		int sum = 0;
		int num = 0;
		while(temp>0) {
			num++;
			temp /= 10;
		}
		temp = n;
		while(temp>0) {
			int rem = temp%10;
			int prod=1;
			for(int i=0; i<num; i++) {
				prod *= rem;
			}
			sum += prod;
			temp /= 10;
		}
		if(sum==n) {
			return true;
		}
		return false;
	}
	
	public static void main(String[] args) {
		int num =153;
		boolean res = isArmStr(num);
		if(res) {
			System.out.println(num+" Armstrong number.");
		}else {
			System.out.println(num+" Not Armstrong number.");
		}	
	}
}

 