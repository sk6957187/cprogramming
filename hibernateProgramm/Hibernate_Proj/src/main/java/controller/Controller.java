package controller;

import java.util.Scanner;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Controller {
	
	static Scanner sc = new Scanner(System.in);
	
	public static void main(String[] args) {
		
//		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
//		System.out.println(fac);
		
		System.out.println("1. save Merchant");
		System.out.println("2. Update Merchant");
		System.out.println("3. Find merchant by id");
		System.out.println("4. Verify merchant by Email and password");
		System.out.println("5. Verify merchant by Phone and password");
		System.out.println("6. Add product");
		System.out.println("7. Update product");
		System.out.println("8. Find product by merchant id");
		System.out.println("9. find product by brand");
		System.out.println("10. Find product by category");
		System.err.println("Enter choice??");
		int choice = sc.nextInt();
		
		switch (choice) {
		case 1:
			
			break;

		default:
			break;
		}
	}
}
