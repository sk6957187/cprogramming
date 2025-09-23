package dsa;

import java.util.Scanner;

//	({[]})
// 	{[]}
//	([)]
//	(([]){})
//	



public class Today4 {
	static char[] stack;
	static int top = -1;
	
	static void checkPattern(String str) {

//		int a=0;
//		int b=0;
//		int c=0;
//		for(char ch: str.toCharArray()) {
//			if(ch == '(') {
//				a++;
//			} else if(ch == ')') {
//				a--;
//			} else if(ch == '{') {
//				b++;
//			} else if(ch == '}') {
//				b--;
//			} else if(ch == '[') {
//				c++;
//			} else if(ch == ']') {
//				c--;
//			}
//			
//		}
//		if(a==0 && b==0 && c==0) {
//			System.out.println("True");
//		} else  {
//			System.out.println("False");
//		}

		
		
		
		int count =0;
		for(int i=0; i<str.length(); i++) {
			if(str.charAt(i) == ')') {
				count--;
			} else if(str.charAt(i)=='(') {
				count++;
			} else if(count < 0) {
				System.out.println("False");
				break;
			}
		}
		if(count>=0) {
			if(count==0) {
				System.out.println("True");
			} else  {
				System.out.println("False");
			}
		}
		
		
	}

	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the pattern:-");
		String str = sc.nextLine();
		checkPattern(str);
		
	}
}

