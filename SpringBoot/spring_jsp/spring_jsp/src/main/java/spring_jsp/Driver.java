package spring_jsp;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Driver {
	public static void main(String[] args) {
		BeanFactory fact = new ClassPathXmlApplicationContext("my_config.xml");
		Person p = (Person) fact.getBean("my_persion");
		System.out.println(p);
	}
}
