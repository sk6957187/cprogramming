package autowired;

import org.springframework.stereotype.Component;

@Component
public class Realme implements Mobile {
    public void ring() {
        System.out.println("Realme is ringing..!!");
    }
}
