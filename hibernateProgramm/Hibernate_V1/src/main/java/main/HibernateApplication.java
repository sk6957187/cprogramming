package main;

import java.util.Scanner;

import service.HibernateCon;
import service.Service;

public class HibernateApplication {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		Service serv = new Service();
		boolean flag = true;
		System.out.println("-----------------Welcome---------------");
		while(flag) {
			System.out.println("----".repeat(20));
			System.out.println("Choice one:- ");
			System.out.println(" 0. Check connection\n 1. Save Employee\n 2. Update Employee\n 3. Show Employee Data\n"
					+ " 4. Delete Employee\n 5. Verify Emp by phone & pass\n 6. Verify email & pass"
					+ "\n 7. Verify emp by id & pass\n 8. Find Employee by name\n 9. Find Employe by Designation"
					+ "\n 10. Find Emp by salary\n 11. Find Employe b/w salary range\n 12. Exit");
			System.out.println("Enter your choice:-");
			int choice = sc.nextInt();
			switch (choice) {
			case 0:
				HibernateCon hibCon = new HibernateCon();
				hibCon.hibernateCon();
				break;
			case 1:
				serv.saveMethod();
				break;
			case 2:
				serv.update();
				break;
			case 3:
				serv.showData();
				break;
			case 4:
				serv.delete();
				break;
			case 5:
				serv.verifyByPhone_Pass();
				break;
			case 6:
				serv.verifyByEmail_Pass();
				break;
			case 12:
				System.out.println("Exit..!!");
				flag=false;
			default:
				break;
			}
		}
		sc.close();
	}
}
