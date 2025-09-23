package main;

import java.util.List;
import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class FindUserByName {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter name:- ");
		String name = sc.nextLine();
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		Query q = man.createQuery("select u from Users u where u.name=?1");
		q.setParameter(1, name);
		List<Users> lu = q.getResultList();
		if(lu.size()>0) {
			for(Users u: lu) {
				System.out.println(u);
			}
		}
		else {
			System.err.println("User not found..!!");
		}
	}
}
