package main;

import java.io.*;
import java.util.*;
/*
 * The quick brown fox jumps over the lazy dog --> pangram
We promptly judged antique ivory buckles for the prize --> not pangram
We promptly judged antique ivory buckles for the next prize --> pangram 
*/


public class Pangram {
    public static void main(String[] args) {
    	Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        String result = pangrams(s);

        System.out.println(result);
        sc.close();
    }
    
    public static String pangrams(String s) {
        String result="";
        Set<Character> set = new HashSet<>();
        for(char ch:s.toLowerCase().toCharArray()){
        	
            if(ch >= 'a' && ch <='z'){
                set.add(ch);
            }
        }
        System.out.println(set.size());
        int i=0;
        List<Character> list = new ArrayList<>(set);
        Collections.sort(list);
        for(char a:list) {
        	i++;
        	System.out.print(i+""+a+" ");
        	
        }
        if(set.size()==26) { 
            result= "pangram"; 
            } else { 
                result= "not pangram"; 
            } 
            return result;

        }
}

