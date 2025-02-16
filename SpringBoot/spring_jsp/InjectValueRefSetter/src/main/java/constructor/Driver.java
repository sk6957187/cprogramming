package constructor;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class Driver {
	public static void main(String[] args) {
		BeanFactory f = new ClassPathXmlApplicationContext("constructor_config.xml");
		Employee e = f.getBean("myEmployee", Employee.class);
		System.out.println(e);
	}
}
