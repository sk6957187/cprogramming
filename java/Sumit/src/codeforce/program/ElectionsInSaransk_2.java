package codeforce.program;

import java.util.HashMap;
import java.util.Scanner;

public class ElectionsInSaransk_2 {
	 static final int MOD = 1000000007;
	
	static int spf(int num) {
		if(num <= 1) {
			return num;
		}
		for(int i=2; i*i<=num; i++) {
			if(num%i == 0) {
				return i;
			}
		}
		return num;
	}
	
	static int gcd(int lcm, int v) {
		
		while (v != 0) {
            int temp = v;
            v = lcm % v;
            lcm = temp;
        }
        return lcm;
	}
	
	static long findLCM(long lcm, int v) {
		return (lcm / gcd((int) lcm, v)) * v;
	}
	
	static long solve(int n, int x, int[] voters) {
		HashMap<Integer, Integer> primeFacter = new HashMap<>();
		for(int num: voters) {
			primeFacter.put(num, spf(num));
		}
		long lcm = 0;
		boolean fLCM = false;
		for(int v: primeFacter.values()) {
			if(!fLCM) {
				lcm = v;
				fLCM = true;
				continue;
			}
			lcm = findLCM(lcm, v);
		}
		long res = (x * lcm) % MOD;
		return res;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the number of test case: ");
		int t = sc.nextInt();
		
		while(t-- > 0) {
			System.out.println("Enter the value of n: ");
			int n = sc.nextInt();
			System.out.println("Enter the value of x: ");
			int x = sc.nextInt();
			int voters[] = new int[n];
			
			for(int i=0; i<n; i++) {
				voters[i] = sc.nextInt();
			}
			
			System.out.println(solve(n,x,voters));
		}
		sc.close();
	}

}
