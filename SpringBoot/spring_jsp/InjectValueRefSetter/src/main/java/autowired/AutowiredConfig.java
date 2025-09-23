package autowired;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "autowired")  // Ensure correct package
public class AutowiredConfig {
}
