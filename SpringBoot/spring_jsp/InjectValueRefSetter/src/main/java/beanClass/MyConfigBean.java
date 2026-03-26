package beanClass;

import java.util.Scanner;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"beanClass", "collection"})
public class MyConfigBean {
    @Bean(name = "scanner")
    public Scanner getScanner() {
        return new Scanner(System.in);
    }

    @Bean(name = "student")
    public Student getStudent() {
        return new Student();
    }
}
