package codeforce.program;

import java.util.Scanner;

// 2236B

public class TatarTVShow {
	
	static char changeChar(char c) {
		if(c == '0') {
			return '1';
		} else {
			return '0';
		}
	}
	
	static boolean bsf(int n, int k, String s) {
		boolean[] vis = new boolean[n];
		for(int start=0; start<k; start++) {
			int one = 0;
			
			for(int i=start; i<n; i+=k) {
				if(s.charAt(i) == '1') {
					one++;
				}
			}
			
			if(one % 2 == 1) {
				return false;
			}
		}
		return true;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Test cases: ");
		int t = sc.nextInt();
		
		while(t-- > 0) {
			System.out.println("n: ");
			int n = sc.nextInt();
			System.out.println("k: ");
			int k = sc.nextInt();
			sc.nextLine();
			System.out.println("Binary string: ");
			String s = sc.nextLine();
			boolean result = bsf(n,k,s);
			if(result) {
				System.out.println("YES");
			} else {
				System.out.println("NO");
			}
		}

	}

}
