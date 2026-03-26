package main;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class SaveDepartmentAndEmployee {
	public static void main(String[] args) {
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		EntityTransaction tran = man.getTransaction();
		tran.begin();
		Department d = new Department();
		d.setName("training");
		d.setLoc("BTM");
		Employee e1 = new Employee();
		e1.setName("Riya");
		e1.setDesg("Trainer");
		e1.setSal(30000);
		e1.setEmail("riya@gmail.com");
		e1.setPassword("riya@123");
		
		Employee e2 = new Employee();
		e2.setName("Raman");
		e2.setDesg("Developer");
		e2.setSal(20000);
		e2.setEmail("raman@gmail.com");
		e2.setPassword("raman@123");
		
		Employee e3 = new Employee();
		e3.setName("sumit");
		e3.setDesg("tester");
		e3.setSal(40000);
		e3.setEmail("sumit@gmail.com");
		e3.setPassword("sumit@123");
		
/*		List<Employee> lemps = new ArrayList<>();
		lemps.add(e1);
		lemps.add(e2);
		lemps.add(e3);
		d.setEmps(lemps);
*/
		d.setEmps(Arrays.asList(e1,e2,e3));
		man.persist(d);
		tran.commit();
		
		
	}
}
