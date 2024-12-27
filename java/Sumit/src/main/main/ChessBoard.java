package main;

import java.util.Scanner;

public class ChessBoard {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Current position: ");
		String cp = sc.next();
		sc.nextLine();
		char curCol = cp.charAt(0);
		int curRow = Integer.parseInt(String.valueOf(cp.charAt(1)));
		System.out.println("Enter multiple move with seprat space: ");
		String[] steps = sc.nextLine().split(" ");
		sc.close();
		for(int i=0; i<steps.length; i++) {
			String step = steps[i];
			char dirn = step.charAt(0);
			int move = step.charAt(1)-'0';
			switch(dirn)
			{
			case 'u':
				curRow += move;
				if(curRow>8) {
					System.out.println("Invalid");
					return;
				}
				break;
				
			case 'd':
				curRow -= move;
				if(curRow<0) {
					System.out.println("Invalid");
					return;
				}
				break;
			
			case 'l':
				curCol -= move;
				if(curCol < 'a') {
					System.out.println("Invalid");
					return;
				}
				break;
			case 'r':
				curCol += move;
				if(curCol > 'h') {
					System.out.println("Invalid");
					return;
				}
				break;
			}
		}
		System.out.println("New position: "+ String.valueOf(curCol)+String.valueOf(curRow));
	
	}
}
