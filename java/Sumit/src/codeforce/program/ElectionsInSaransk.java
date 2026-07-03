package codeforce.program;

//	Question Id: 2236 F1

import java.util.HashMap;
import java.util.Scanner;

public class ElectionsInSaransk {
	static final int MAX = 500000;
    static final int MOD = 1000000007;

    static int[] spf = new int[MAX + 1];
    
    public static int spf(int num) {
    	if(num <= 1) {
    		return num;
    	}
    	
    	for(int i=2; i*i <= num; i++) {
    		if(num % i == 0) {
    			return i;
    		}
    	}
    	
    	return num;
    }
	
	public static int solve(int n, int x, int[] arr) {
		HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
		for(int num: arr) {
			while(num > 1) {
//				int prime = spf[num];
				int prime = spf(num);
				int count = 0;
				while(num % prime == 0) {
					num /= prime;
					count++;
				}
				map.put(prime, map.getOrDefault(prime, 0) + count);
			}
		}
		long ans = 1;
		
		for(int totalExp : map.values()) {
			ans = (ans * (totalExp + 1L)) % MOD;
		}
		
		return (int) ans;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
//		System.out.println("Number of test case: ");
		int t = sc.nextInt();
		
		while(t-- > 0) {
//			System.out.println("numbers of voter: ");
			int n = sc.nextInt();
//			System.out.println("Favorite number: ");
			int x = sc.nextInt();
//			System.out.println("Enters the arr: ");
			int[] arr = new int[n];
			for(int i=0; i<n; i++) {
				arr[i] = sc.nextInt();
			}
			
			System.out.println(solve(n, x, arr));
		}
		
		sc.close();
	}

}
