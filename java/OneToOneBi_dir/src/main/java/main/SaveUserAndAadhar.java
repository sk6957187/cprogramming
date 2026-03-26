package main;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class SaveUserAndAadhar {
	public static void main(String[] args) {
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		EntityTransaction tran = man.getTransaction();
		
		tran.begin();
		Users u = new Users();
		u.setName("Rishu");
		u.setPhone(9955887777l);
		AadharCard a = new AadharCard();
		a.setNumber(112233445555l);
		a.setAddress("BTM");
		a.setUser(u);
		u.setCard(a);
		man.persist(a);
		man.persist(u);
		tran.commit();

		
	}
}
