package main;

import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class SaveData {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter phone number");
		long ph = sc.nextLong();
		sc.nextLine();
		System.out.println("Enter password");
		String pwd = sc.nextLine();
		System.out.println("Enter name");
		String name = sc.nextLine();
		System.out.println("Email");
		String email = sc.next();
		
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		EntityTransaction tran = man.getTransaction();
		tran.begin();
		Marchent m = new Marchent();
		m.setEmail(email);
		m.setName(name);
		m.setPassword(pwd);
		m.setPhone(ph);
		man.persist(m);
		tran.commit();
	}
}
