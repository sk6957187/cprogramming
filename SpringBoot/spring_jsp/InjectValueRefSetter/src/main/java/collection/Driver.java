package collection;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Driver {
	public static void main(String[] args) {
		BeanFactory f = new ClassPathXmlApplicationContext("collection_config.xml");
		Student s = f.getBean("myStudent", Student.class);
		System.out.println(s);
		
	}
}
