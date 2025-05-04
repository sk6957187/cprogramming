package spring;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Driver {
	public static void main(String[] args) {
		BeanFactory f = new ClassPathXmlApplicationContext("my_config.xml");
		Person p = f.getBean("myPerson", Person.class);
		p.use();
		
	}
}
