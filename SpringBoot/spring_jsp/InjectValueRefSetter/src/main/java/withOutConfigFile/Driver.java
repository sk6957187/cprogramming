package withOutConfigFile;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Driver {
	public static void main(String[] args) {
		ApplicationContext context = new AnnotationConfigApplicationContext(myConfig.class);
		Employee e = context.getBean("employee", Employee.class);
		System.out.println(e);
	}	
}
