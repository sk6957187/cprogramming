package main;

import javax.persistence.Query;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DisplayData {
	public static void main(String[] args) {
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		Query q = man.createNativeQuery("select * from User", Marchent.class);
		List<Marchent> lm = q.getResultList();
		
		if(lm.size() > 0) {
			for(Marchent m: lm) {
				System.out.println(m);
			}
		} else {
			System.out.println("Not data foud");
		}
		
		q = man.createNativeQuery("SELECT u.name, u.password FROM User u");
        List<Object[]> resultList = q.getResultList();

        if (!resultList.isEmpty()) {
            for (Object[] row : resultList) {
                String name = (String) row[0];
                String password = (String) row[1];
                System.out.println("Name: " + name + ", Password: " + password);
            }
        } else {
            System.out.println("No data found");
        }
	}
}
