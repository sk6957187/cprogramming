package main;

import java.util.List;
import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class FindEmpByDeptIdAndName {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter dept id");
		int dId = sc.nextInt();
		sc.nextLine();
		System.out.println("Enter emp name");
		String eName = sc.nextLine();
		
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
//		Query q = man.createQuery("select d.emps from Department d where d.id=?1 and d.emps.name=?2");
		Query q = man.createQuery("SELECT e FROM Department d JOIN d.emps e WHERE d.id = ?1 AND e.name = ?2");
		q.setParameter(1, dId);
		q.setParameter(2, eName);
		List<Employee> le = q.getResultList();
		if(le.size()>0) {
			for (Employee employee : le) {
				System.out.println(employee);
			}
		}
		else {
			System.err.println("Not found..!!");
		}
	}
}
