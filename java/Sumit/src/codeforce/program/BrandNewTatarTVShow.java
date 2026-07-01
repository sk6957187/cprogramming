package codeforce.program;

//	Question id: 2236D

import java.util.Arrays;
import java.util.Scanner;

public class BrandNewTatarTVShow {
	
	public static boolean ews(int n, int k, int[] arr) {
		
		int[] value = new int[n];
		int[] freq = new int[n];
		int m = 0;
		 
		 for(int i=0; i<n; i++) {
			 int j = i;
			 while(j<n && arr[j] == arr[i]) {
				 j++;
			 }
			 value[m] = arr[i];
			 freq[m] = j-i;
			 m++;
			 i=j;
		 }
		 
		 for(int i=m-1; i>=0; i--) {
			 if(freq[i] % 2 == 0) {
				 return true;
			 }
			 if(i>0 && value[i] - value[i-1] <= k) {
				 return true;
			 }
		 }
		return false;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int t = sc.nextInt();
		
		do {
			System.out.println("Enter n: ");
			int n = sc.nextInt();
			int[] arr = new int[n];
			
			System.out.println("Enter k: ");
			int k = sc.nextInt();
			for(int i=0; i<n; i++) {
				arr[i] = sc.nextInt();
			}
			
			Arrays.sort(arr);
			boolean res = ews(n,k,arr);
			if(res) {
				System.out.println("YES");
			} else {
				System.out.println("NO");
			}
		} while (--t > 0);

	}

}
