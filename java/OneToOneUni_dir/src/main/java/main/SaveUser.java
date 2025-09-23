package main;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class SaveUser {
	public static void main(String[] args) {
		EntityManagerFactory fac = Persistence.createEntityManagerFactory("dev");
		EntityManager man = fac.createEntityManager();
		EntityTransaction tran = man.getTransaction();
		tran.begin();
		Person p = new Person();
		p.setName("Mohan");
		p.setPhone(99988776644l);
		PanCard card = new PanCard();
		card.setNumber("ABCD1243A");
		card.setPincode(560076);
		p.setCard(card);
		
		man.persist(p);
		man.persist(card);
		tran.commit();
	}
}
