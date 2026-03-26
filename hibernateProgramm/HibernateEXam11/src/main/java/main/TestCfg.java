package main;

import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;

public class TestCfg {

	public static void main(String[] args) {
		Configuration conf = new Configuration();
		conf.configure(); // load
		SessionFactory sef = conf.buildSessionFactory(); // validate
		System.out.println(sef);

	}

}
