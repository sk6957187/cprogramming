package main;

import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class FindPersonById {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int pid = sc.nextInt();
		
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		
		Person p = man.find(Person.class, pid);
		if(p != null) {
			System.out.println(p);
		} else {
			System.err.println("No person info found since id is invalid..!!");
		}
		sc.close();
		fac.close();
		man.close();
	}
}
