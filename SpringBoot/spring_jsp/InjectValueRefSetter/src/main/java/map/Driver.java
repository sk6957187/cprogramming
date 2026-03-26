package map;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Driver {
	public static void main(String[] args) {
		BeanFactory f = new ClassPathXmlApplicationContext("map_config.xml");
		Shop s = f.getBean("myShop", Shop.class);
		System.out.println(s);
	}
}
