package autowired;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Driver {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AutowiredConfig.class);
        
        // Fetch by type instead of name
        Person p = context.getBean(Person.class);
        p.use();
    }
}
