package main;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class UpdateDataUsing_update {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
       Configuration conf = new Configuration();
       conf.configure();
       SessionFactory sef = conf.buildSessionFactory();
       Session ses = sef.openSession();
       Transaction tran = ses.getTransaction();
       
       tran.begin();
       
       Employee e = new Employee();
       e.setId(2);
       e.setName("Manu");
       e.setPhone(9162901040l);
       e.setDesg("TL");
       e.setPassword("lkfhsdiufhdwd");
       e.setEmail("kjdfgsdyufgd");
       
       ses.update(e);
       tran.commit();
	}

}
