package autowired;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component  // This ensures Spring registers this class as a bean
public class Person {
    @Autowired
    private Mobile mobile;

    void use() {
        System.out.println("Using the mobile..!!");
        mobile.ring();
    }
}
