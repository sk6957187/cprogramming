package main;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class Delete_row_from_Databse {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Configuration conf = new Configuration();
		conf.configure();
		SessionFactory sef = conf.buildSessionFactory();
		Session ses = sef.openSession();

		Transaction tran = ses.getTransaction();
		tran.begin();
		Employee e = ses.get(Employee.class, 4);
		if (e != null) {
			ses.delete(e);
			tran.commit();
		} else {
			System.out.println("Employee deatil is not deleted");
		}

	}

}
