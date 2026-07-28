package codeforce.program;

//	Question id: 2238B

import java.util.Scanner;

public class CrimsonTriples {
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int t = sc.nextInt();
		
		while(t-- > 0) {
			System.out.println("enter n: ");
			int n = sc.nextInt();
			 long ans = 0;

	            for (int b = 1; b <= n; b++) {
	                long cnt = n / b;
	                ans += cnt * cnt;
	            }

	            System.out.println(ans);
		}
		sc.close();
	}
}
