package main;

import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class FindAadharByUserPhone {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter phone number");
		long ph = sc.nextLong();
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		Query q = man.createQuery("select a from AadharCard a where a.users.phone=?1");
//		Query q = man.createQuery("select u.card from Users u where u.phone=?1");
		q.setParameter(1, ph);
		try {
			AadharCard u = (AadharCard) q.getSingleResult();
			if(u != null) {
				System.out.println(u);
			}else {
				System.err.println("not found..!!");
			}
		} catch (Exception e) {
			System.err.println("Not found..!!");
			e.printStackTrace();
		}
	}
}
