package main;

import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class FindDepartmentById {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter dept id");
		int id = sc.nextInt();
		
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		Department d = (Department) man.find(Department.class, id);
		if(d != null) {
			System.out.println(d);
		} else {
			System.err.println("Not found..!!");
		}
		
	}
}
