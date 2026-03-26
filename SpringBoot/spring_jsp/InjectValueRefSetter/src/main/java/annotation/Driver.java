package annotation;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Driver {
	public static void main(String[] args) {
		BeanFactory f = new ClassPathXmlApplicationContext("annotation_config.xml");
		Employee e = f.getBean("employee", Employee.class);
		e.emp();
	}
}
