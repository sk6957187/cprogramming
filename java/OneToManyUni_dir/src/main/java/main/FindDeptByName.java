package main;

import java.util.List;
import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class FindDeptByName {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter dept name");
		String dName = sc.nextLine();
		
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		Query q = man.createQuery("select d from Department d where d.name=?1");
		q.setParameter(1, dName);
		List<Department> dept = q.getResultList();
		if(dept.size()>0) {
			for (Department department : dept) {
				System.out.println(department);
			}
		}else {
			System.err.println("Not found..!!");
		}
		
	}
}
