package main;

import java.util.Scanner;

public class Sudoko {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int r=sc.nextInt();
		int c=sc.nextInt();
		char[][] board = new char[r][c];
		for(int i=0; i<r; i++) {
			for(int j=0; j<c; j++) {
				board[i][j] = sc.next().charAt(0);
			}
		}
		//hii
		
		for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
		}
		solveSudoko(board,r,c);
		sc.close();
	}

	private static void solveSudoko(char[][] board, int r, int c) {
		if(helper(board, 0, 0)) {
			System.out.println("Final print");
			for(int i = 0; i < r; i++) {
	            for(int j = 0; j < c; j++) {
	                System.out.print(board[i][j] + " ");
	            }
	            System.out.println();
			}
		} else {
			System.out.println("False");
		}
		
	}

	private static boolean helper(char[][] board, int row, int col) {
		if(row == board.length)
			return false;
		
		int nrow = 0;
		int ncol = 0;
		if(col==board.length) {
			nrow = row+1;
			ncol=0;
		} else {
			nrow=col+1;
			ncol=col+1;
		}
		if(board[row][col] != '.') {
			if(helper(board,nrow,ncol)) {
				return true;
			}
		} else {	 //fill place
			for(int i=1; i<=9; i++) {
				if(isSafe(board, row, col, i)) {
					board[row][col]=(char)(i+'0');
					if(helper(board,nrow,ncol))
						return true;
					else 
						board[row][col]='.';
				}
			}
		}
		return false;	
	}
	
	public static boolean isSafe(char[][] board, int row, int col, int num) {
		//column
		for(int i=0; i < board.length; i++) {
			if(board[i][col]==(char)(num+'0')) {
				return false;
			}
		}	//row
		for(int j=0; j<board.length; j++) {
			if(board[row][j]==(char)(num+'0')) {
				return false;
			}
		}	//grid
		int sr = 3*(row/3);
		int sc = 3*(col/3);
		for(int i=sr; i<sr+3; i++) {
			for(int j=sc; j<sc+3; j++) {
				if(board[i][j]==(char)(num+'0')) {
					return false;
				}
			}
		}
		return true;
	}
}
