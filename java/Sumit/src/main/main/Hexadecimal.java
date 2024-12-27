package main;

public class Hexadecimal {
	
	public static String decToHexDcm(int n) {
		int sum = 0;
		String str = "";
		while(n>0) {
			int rem = n%16;
			if(rem>9) {
				str = (char)(55+rem) + str;
			}else {
				str = rem + str;
			}
			n /= 16;
		}
		//System.out.println(str);
		return str;
	}

	public static void main(String[] args) {
		int n = 31;
		String res = decToHexDcm(n);
		System.out.println(res);
	}

}
