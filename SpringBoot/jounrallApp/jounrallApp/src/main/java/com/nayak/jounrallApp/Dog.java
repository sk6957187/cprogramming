package com.nayak.jounrallApp;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

@Component
public class Dog {
    public String fun(){
        System.out.println("King");
        return "Dog";
    }

}
