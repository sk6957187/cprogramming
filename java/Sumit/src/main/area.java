package main;

import java.util.Scanner;

public class area {
	public static void main(String[] args) {
	int x,y,area;
	Scanner sc = new Scanner(System.in);
	System.out.println("Enter the first side:");
	x = sc.nextInt();
	System.out.println("Enter the second side:");
	y=sc.nextInt();
	area = x*y;
	System.out.println("Area "+x+"X"+y+" is "+area);
	sc.close();
	}
}

//@FunctionalInterface
//interface Math{
//	void square(int n);
//}
//public class Today{
//	public static void main(String[] args) {
//		
//		Math m = (n) -> {
//			System.out.println("square: "+n*n) ;
//			System.out.println("cube: "+n*n*n);
//		};
//		m.square(5);
//	}
//}