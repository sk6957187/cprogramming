package main;

import java.util.Scanner;

public class Arrays2D {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter size of array (m*n);- ");
		int m = sc.nextInt();
		int n = sc.nextInt();
		int[][] arr = new int[m][n];
		for(int i=0; i<m; i++) {
			for(int j=0; j<n; j++) {
				arr[i][j] = sc.nextInt();
			}
		}
		int max=0;
		int row=0;
		for(int i=0; i<m; i++) {
			int count=0;
			for(int j=0; j<n; j++) {
				if(arr[i][j] == 1) {
					count++;
				}
			}
			if(max < count) {
				max = count;
				row=i;
			}
		}
		if(max==0) {
			System.out.println(-1);
		}
		else
			System.out.println(row);
		sc.close();
	}
}
