package dsa;

import java.util.Scanner;

public class BaracketBalanced {
	static char[] stack;
	static int top = -1;
	
	
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String str = sc.next();
		int count =0;
		for(int i=0; i<str.length(); i++) {
			if(str.charAt(i) == ')') {
				count--;
			} else if(str.charAt(i)=='(') {
				count++;
			} else if(count < 0) {
				System.out.println("Unbalaced");
				break;
			}
		}
		if(count>=0) {
			if(count==0) {
				System.out.println("Balanced");
			} else  {
				System.out.println("Unbalanced");
			}
		}
		
//		stack = new char[str.length()];
//		boolean flag = true;
//		for(int i=0; i<str.length(); i++) {
//			if(str.charAt(i) == '(') {
//				push();
//			} else if(top!=-1) {
//				
//			}
//		}
		sc.close();
	}
}
