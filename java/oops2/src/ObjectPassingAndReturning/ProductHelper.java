package ObjectPassingAndReturning;

import java.util.Scanner;

public class ProductHelper {
	static Product createProduct() {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Pid");
		int id = sc.nextInt();
		System.out.println("Enter Price");
		double d = sc.nextDouble();
		Product pro = new Product(id, d);
		return pro;
		
	}
	static void displayProductInfo(Product p) {
		System.out.println("PID "+p.pid);
		System.out.println("Price "+p.price );
	}

}
