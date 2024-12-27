package main;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class NQueen {
	
	public static boolean isSafe(int row, int col, char[][] board) {
		//horizontal
		for(int j=0; j<board.length; j++) {
			if(board[row][j]=='Q')
				return false;
		}
		//vertical
		for(int i=0; i<board.length; i++) {
			if(board[i][col]=='Q')
				return false;
		}
		//upper left
		int r=row;
		for(int c=col; c>=0 && r>=0; c--,r--) {
			if(board[r][c]=='Q')
				return false;
		}
		//upper right
		r=row;
		for(int c=col; c<board.length && r>=0; c++,r--) {
			if(board[r][c]=='Q')
				return false;
		}
		//lower left
		r=row;
		for(int c=col; c>=0 && r<board.length; r++,c--) {
			if(board[r][c]=='Q')
				return false;
		}
		//lower right
		for(int c=col; c>board.length && r<board.length; c++,r++) {
			if(board[r][c]=='Q')
				return false;
		}
		return true;
	}
	
	public static void saveBoard(char [][]board, List<List<String>> allBoard) {
		List<String> newBoard = new ArrayList<>();
		String row= " ";
		for(int i=0; i<board.length; i++) {
			row="";
			for(int j=0; j<board[i].length; j++) {
				if(board[i][j]=='Q') 
					row="Q";
				else
					row=".";
			}
			newBoard.add(row);
		}
		allBoard.add(newBoard);
	}
	
	public static void helper(char [][] board, List<List<String>> allBoard, int col) {
		if(col == board.length) {
			saveBoard(board, allBoard);
			return;
		}
		for(int row=0; row<board.length; row++) {
			if(isSafe(row, col, board)) {
				board[row][col]='Q';
				helper(board, allBoard, col+1);
				board[row][col]='.';
			}
		}
	}
	
	public static List<List<String>> solveNQueen(int n){
		List<List<String>> allBoard = new ArrayList<>();
		char[][] board = new char[n][n];
		helper(board, allBoard, 0);
		return allBoard;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		List<List<String>> result = solveNQueen(n);
		for(List<String> res: result) {
			System.out.println(res);
		}
		sc.close();

	}

}
