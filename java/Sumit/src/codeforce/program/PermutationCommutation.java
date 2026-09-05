package codeforce.program;

import java.util.Scanner;

public class PermutationCommutation {
	
	static String isFunction(int[] arrA, int[] arrB, int n) {
		int[] arrP = new int[n];
		
		boolean result = true;
		for(int i=1; i<=n; i++) {
			if(arrB[i] != -1) {
				result = false;
				break;
			}
		}
		if(result) {
			return "YES";
		}
		
		for(int i=1; i<=n; i++) {
			if(arrB[i] != -1 && arrA[arrB[i]] != arrB[arrA[i]]) {
				return "NO";
			}
		}
		return "YES";
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int t = sc.nextInt();
		while(t-- > 0) {
			int n = sc.nextInt();
			int[] arrA = new int[n+1];
			int[] arrB = new int[n+1];
			
			for(int i=1; i<=n; i++) {
				arrA[i] = sc.nextInt();
			}
			for(int i=1; i<=n; i++) {
				arrB[i] = sc.nextInt();
			}
			
			System.out.println(isFunction(arrA, arrB, n));
		}
		sc.close();

	}

}
