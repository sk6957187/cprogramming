package main;

import java.util.Scanner;
import java.util.regex.*;

class PasswordCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String s = sc.next();
        Matcher num,low,up,spec;
        num = Pattern.compile("[0123456789]").matcher(s);
        low = Pattern.compile("[abcdefghijklmnopqrstuvwxyz]").matcher(s);
        up = Pattern.compile("[ABCDEFGHIJKLMNOPQRSTUVWXYZ]").matcher(s);
        spec = Pattern.compile("[!@#$%^&*()-/+]").matcher(s);
        int count = 0;
        if(!num.find())
            count++;
        if(!low.find())
            count++;
        if(!up.find())
            count++;
        if(!spec.find())
            count++;
        if(n+count<6){
            count+=6-n-count;
        }
//        System.out.println(num);
        System.out.println(count);
    }
}





