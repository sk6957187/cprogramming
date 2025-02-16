package hasARelation;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class Driver {
	public static void main(String[] args) {
		BeanFactory f = new ClassPathXmlApplicationContext("hasARelation_config.xml");
		Car c = f.getBean("myCar", Car.class);
		c.run();
	}
}
