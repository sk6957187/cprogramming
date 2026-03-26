package main;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class SetDataInDatabase {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Configuration conf = new Configuration();
		conf.configure(); // load
		SessionFactory sef =  conf.buildSessionFactory();  // validate
		// System.out.println(sef);

		
		// main code to add data in table.
		Session ses = sef.openSession();
		Transaction tran = ses.getTransaction();
		tran.begin();
		Employee e = new Employee();
		e.setId(2);
		e.setName("meena");
		e.setPhone(9905054961l);
		e.setDesg("CO");
		e.setEmail("peena@gmail.com");
		e.setPassword("peena123");
		
		int id = (Integer) ses.save(e);
		tran.commit();
		System.out.println("Employee is saved with an id " +id);
	}

}
