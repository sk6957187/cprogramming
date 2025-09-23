package autowired;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
public class Vivo implements Mobile {
    public void ring() {
        System.out.println("Vivo is ringing..!!");
    }
}
