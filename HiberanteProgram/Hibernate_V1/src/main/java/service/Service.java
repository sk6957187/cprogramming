package service;

import java.util.List;

import javax.persistence.NoResultException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import model.EmployeeConfig;

public class Service {
	public void saveMethod() {
		
		HibernateCon hibCon = new HibernateCon();
		Session ses = hibCon.hibernateCon();
		Transaction tran = ses.getTransaction();
		tran.begin();
		EmployeeConfig e = new EmployeeConfig();
		e.setId(4);
		e.setName("Sohan");
		e.setPhone(9933227788l);
		e.setDesg("Test");
		e.setEmail("sohan@gmail.com");
		e.setPassword("sohan1234");
		ses.saveOrUpdate(e);
		tran.commit();
		System.out.println(" saved");
	}
	
	public void update() {
		EmployeeConfig e = null;
		HibernateCon hibCon = new HibernateCon();
		Session ses = hibCon.hibernateCon();
		int id = 4;
		String name = "Mohan";
		long phone = 9955667788l;
		String desc = "CEO";
		String email = "";
		String password = "";

//		EmployeeConfig e = ses.get(EmployeeConfig.class, id);
		Query<EmployeeConfig> q = ses.createQuery("select e from EmployeeConfig e where e.id = ?1");
		q.setParameter(1, id);
		try {
			e = q.getSingleResult();
		}catch (NoResultException e1) {
			System.out.println("Not found");
		}
		
		if(e != null) {
			if(id==0) {
				id = e.getId();
			}
			if (name == null || name.trim().isEmpty()) {
			    name = e.getName();
			}
			if(phone == 0) {
				phone = e.getPhone();
			}
			if (desc == null || desc.trim().isEmpty()) {
			    desc = e.getDesg();
			}
			if (email == null || email.trim().isEmpty()) {
			    email = e.getEmail();
			}
			if (password == null || password.trim().isEmpty()) {
			    password = e.getPassword();
			}
			Transaction tran = ses.beginTransaction();
			e.setName(name);
			e.setPhone(phone);
			e.setDesg(desc);
			e.setEmail(email);
			e.setPassword(password);
			ses.update(e);
			tran.commit();
			System.out.println(e);
		}else {
			System.out.println("No employee found..!!");
		}
		
	}
	
	public void showData() {
		HibernateCon hibCon = new HibernateCon();
		Session ses = hibCon.hibernateCon();
//		Query<EmployeeConfig> q = ses.createQuery("from EmployeeConfig", EmployeeConfig.class);
		Query<EmployeeConfig> q = ses.createQuery("select e from EmployeeConfig e");
		List<EmployeeConfig> lesmps = q.getResultList();
		if(lesmps.size() > 0) {
			for(EmployeeConfig e: lesmps) {
				System.out.println(e);
			}
		}else {
			System.out.println("No data available..!!");
		}
	}
	
	public void delete() {
		EmployeeConfig e = null;
		int id = 4;
		HibernateCon hibCon = new HibernateCon();
		Session ses = hibCon.hibernateCon();
		Transaction tran = ses.getTransaction();
		tran.begin();
//		Query<EmployeeConfig> q = ses.createQuery("select e from EmployeeConfig e where e.id=?1");
//		q.setParameter(1, id);
//		try {
//			e = q.getSingleResult();
//		} catch (Exception e1) {
//			System.out.println("Employee information in not available..!!");
//		}
		e = ses.get(EmployeeConfig.class, id);
		if(e!=null) {
			ses.delete(e);
			tran.commit();
			System.out.println("Deleted");
		}
	}
	
	public void verifyByPhone_Pass() {
		EmployeeConfig e =null;
		HibernateCon hibCon = new HibernateCon();
		Session ses = hibCon.hibernateCon();
		String pass = "sohan1234";
		long phone = 9933227788l;
//		Transaction tran = ses.getTransaction();
//		tran.begin();
		Query<EmployeeConfig> q = ses.createQuery(
                "SELECT e FROM EmployeeConfig e WHERE e.phone = :phone AND e.password = :password", 
                EmployeeConfig.class
            );
            q.setParameter("phone", phone);
            q.setParameter("password", pass);
		try {
			e = q.getSingleResult();
		}catch (Exception e1) {
			System.out.println("Employee is not verified because of invalid credentials");
		}
		if(e != null) {
			System.out.println(e);
		}
	}
	
	public void verifyByEmail_Pass() {
		EmployeeConfig e =null;
		HibernateCon hibCon = new HibernateCon();
		Session ses = hibCon.hibernateCon();
		String pass = "sohan1234";
		String email = "sohan@gmail.com";
		Query<EmployeeConfig> q = ses.createQuery("select e from EmployeeConfig e where e.email=?1 and e.password=?2");
		q.setParameter(1, email);
		q.setParameter(2, pass);
		try {
			e = q.getSingleResult();
		}catch (Exception e1) {
			System.out.println("Employee is not verified because of invalid credentials");
		}
		if(e != null) {
			System.out.println(e);
		}
		
	}
}
