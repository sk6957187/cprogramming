package main;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class SaveOrUpdate_data {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
       Configuration conf = new Configuration();
       conf.configure();
       SessionFactory sef = conf.buildSessionFactory();
       Session ses = sef.openSession();
       
       Transaction tran = ses.getTransaction();
       tran.begin();
       
       Employee e = new Employee();
       e.setId(4);
       e.setName("Nishant");
       e.setPhone(9933221100l);
       e.setDesg("testing");
       ses.saveOrUpdate(e);
       tran.commit();
       System.out.println(" saved");
	}

}
