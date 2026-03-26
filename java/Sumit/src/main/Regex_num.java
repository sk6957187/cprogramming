package main;

import java.util.Scanner;

/*
 Input:-
    000.12.12.034
    121.234.12.12
    23.45.12.56
    00.12.123.123123.123
    122.23
    Hello.IP
Output:-
    true
    true
    true
    false
    false
    false 
*/


class regex_num{

    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        while(in.hasNext()){
            String IP = in.next();
            System.out.println(IP.matches(new MyRegex().pattern));
        }
        in.close();

    }
}

//Write your code here
class MyRegex{
    String num = "([01]?\\d{1,2}|2[0-4]?\\d|25[0-5])";
    public String pattern = num+"."+num+"."+num+"."+num;
}
