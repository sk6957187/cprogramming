package dsa;

import java.util.Scanner;

public class Today{
	static String toSort(String str) {
		if(str.length() <= 10) {
			return str;
		}
		int l = (str.length()-2);
		String res = ""+ str.charAt(0) + l + str.charAt(str.length()-1);
		return res;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		sc.nextLine();
		while(n-- > 0) {
			String str = sc.nextLine();
			
			System.out.println(toSort(str));
		}
		
	}
}
