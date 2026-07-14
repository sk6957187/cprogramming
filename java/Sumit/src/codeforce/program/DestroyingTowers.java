package codeforce.program;

//	Question id: 2237A

import java.util.Scanner;

public class DestroyingTowers {
	
	static int destroyedTower(int n, int[] th) {
		int min = Integer.MAX_VALUE;
		long sum = 0;
		
		for(int i=1; i<n+1; i++) {
			min = Math.min(min, th[i]);
			sum += min;
		}
		
		return (int)sum;
		
	}
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		System.out.print("Enter the number of test case: ");
		int t = sc.nextInt();
		
		while(t-- > 0){
			System.out.print("Enter number of towers: ");
			int n = sc.nextInt();
			
			System.out.println("Eneter the height of tower:");
			int th[] = new int[n+1];
			
			for(int i=1; i<n+1; i++) {
				th[i] = sc.nextInt();
			}
			
			System.out.println(destroyedTower(n, th));
		}
		sc.close();
	}
}
