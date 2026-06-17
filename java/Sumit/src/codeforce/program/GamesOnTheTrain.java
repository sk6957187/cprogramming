package codeforce.program;

//Question id: 2236A

import java.util.Arrays;
import java.util.Scanner;
 
public class GamesOnTheTrain {
 
	public static int game(int n, int[] arr) {
 
		Arrays.sort(arr);
		int max = arr[n-1];
//		int min = arr[0];
// 
		int k = max - min + 1;
		int[] arr1 = new int[n];
		int h = max + 1;
		for(int i=0; i<n; i++) {
			arr1[i] = h - arr[i];
		}
 
		Arrays.sort(arr1);
 
		return arr1[n-1];
	}
 
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Test case: ");
		int testCase = sc.nextInt();
 
		for(int i=0; i<testCase; i++) {
			System.out.println("Size of arr: ");
			int n = sc.nextInt();
			int[] arr = new int[n];
			for(int j=0; j<n; j++) {
				System.out.print("arr elem: ");
				arr[j] = sc.nextInt();
				
			}
			System.out.println(game(n, arr));
		}
		sc.close();
	}
 
}
