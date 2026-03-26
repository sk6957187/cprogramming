package beanClass;

import java.beans.Statement;
import beanClass.Student;

import java.util.Scanner;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import autowired.AutowiredConfig;
import autowired.Person;

public class Driver {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(MyConfigBean.class);

        Scanner scanner = context.getBean("scanner", Scanner.class);
        System.out.println(scanner);

        Student student = context.getBean("student", Student.class);
        System.out.println(student);
    }
}
