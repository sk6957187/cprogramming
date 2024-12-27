package main;

public class DeseriumNum {
	
	public static boolean isDeseriumNum(int n){
		int temp = n;
		int count=0;
		while(temp>0) {
			count++;
			temp /= 10;
		}
		temp=n;
		int sum=0;
		while(temp>0) {
			int prod = 1;
			int rem = temp%10;
			for(int i=count; i>0; i--) {
				prod *= rem;
			}
			count--;
			sum += prod;
			temp /= 10;
		}
		if(n==sum) {
			return true;
		}
		return false;
	}
	
	public static void main(String[] args) {
		int n =135;
		boolean res = isDeseriumNum(n);
		if(res) {
			System.out.println(n+" is a Deserium number.");
		}else {
			System.out.println(n+" is not a Deserium number.");
		}
	}

}
