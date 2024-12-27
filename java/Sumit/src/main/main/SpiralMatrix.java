package main;

import java.util.*;

public class SpiralMatrix {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		int m = sc.nextInt();
		int[][] matrix = new int[n][m];
		System.out.println("Enter matrix:-");
		for(int i=0;i<n; i++) {
			for(int j=0; j<m; j++) {
				matrix[i][j] = sc.nextInt();
			}
		}
		System.out.println("The spiral order matrix is:-");
		int rowStart=0;
		int rowEnd= n-1;
		int colStart = 0;
		int colEnd = m-1;
		while(rowStart<=rowEnd && colStart<=colEnd) {
			for(int col=colStart; col<=colEnd; col++) {
				System.out.print(matrix[rowStart][col]+" ");
			}
			rowStart++;
			for(int row=rowStart; row<=rowEnd; row++) {
				System.out.print(matrix[row][colEnd]+" ");
			}
			colEnd--;
			for(int col=colEnd; col>=colStart; col--) {
				System.out.print(matrix[rowEnd][col]+" ");
			}
			rowEnd--;
			for(int row=rowEnd; row>=rowStart; row--) {
				System.out.print(matrix[row][colStart]+" ");
			}
			colStart++;
		}
		sc.close();
		
	}

}
