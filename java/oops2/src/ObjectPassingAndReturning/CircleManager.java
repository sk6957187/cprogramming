package ObjectPassingAndReturning;

import java.util.Scanner;

public class CircleManager {
	static Circle createCircle() {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter radius:-");
		double r = sc.nextDouble();
		Circle cir = new Circle(r);
		return cir;
	}
	static void displayCircle(Circle c) {
		System.out.println("Circle radius: "+c.radius);
	}
}
