package main;

import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class FindUserByAadharId {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Aadhar id:-");
		int id = sc.nextInt();
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
//		Query q = man.createQuery("select a.users from AadharCard a where a.id=?1");
		Query q = man.createQuery("select u from Users u where u.card.id=?1");
		q.setParameter(1, id);
		try {
			Users u = (Users) q.getSingleResult();
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
