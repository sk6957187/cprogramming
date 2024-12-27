package string;

import java.util.Scanner;

public class SplitRegex {
	public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Enter senteance: ");
        String str = scan.nextLine();
        String[] list;
        str=str.trim();
        list = str.split("[^a-zA-Z]+");    //split the string by any non-alphabetic character
        //list = s.split("[!,?._'@]+");      //split by special characters
        if(list.length==1 && list.equals(null)) {
        	System.out.println("0");
        }
        else {
        	System.out.println(list.length);
        	for(String temp: list){
        		System.out.println(temp);
        	}
        }
        scan.close();
    }

}
