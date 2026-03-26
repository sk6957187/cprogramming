package main;

import java.util.List;
import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class FindEmpByDesg {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter emp desg:");
		String desg = sc.nextLine();
//		double sal = sc.nextDouble();
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		Query q = man.createQuery("select e from Employee e where e.desg=?1");
		q.setParameter(1, desg);
		List<Employee> le = q.getResultList();
		if(le.size()>0) {
			for (Employee employee : le) {
				System.out.println(employee);
			}
		} else {
			System.err.println("Not found..!!");
		}
	}
}
