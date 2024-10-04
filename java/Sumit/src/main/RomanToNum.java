package main;

import java.util.HashMap;
import java.util.Scanner;

public class RomanToNum {

    public static int NumValue(char rom) {
        if (rom == 'I')
            return 1;
        if (rom == 'V')
            return 5;
        if (rom == 'X')
            return 10;
        if (rom == 'L')
            return 50;
        if (rom == 'C')
            return 100;
        if (rom == 'D')
            return 500;
        if (rom == 'M')
            return 1000;
        return -1;
    }

    public static int romToNum(String str) {
        HashMap<Character, Integer> hm = new HashMap<>();
    	int sum = 0;
        hm.put('I', 1);
        hm.put('V', 5);
        hm.put('X', 10);
        hm.put('L', 50);
        hm.put('C', 100);
        hm.put('D', 500);
        hm.put('M', 1000);
/* use normal if condition-------------------------
        for(int i=0; i<str.length(); i++) {
            int s1 = NumValue(str.charAt(i));
            if(i+1 < str.length()) {
                int s2 = NumValue(str.charAt(i+1));
                if(s1 >= s2) {
                    sum = sum + s1;
                } else {
                    sum = sum - s1;
                }
            } else {
                sum = sum + s1;
            }
        }
        return sum;
*/
        for(int i =0; i<str.length(); i++) {
        	int s1 = hm.get(str.charAt(i));
        	if(i+1 < str.length()) {
        		int s2 = hm.get(str.charAt(i+1));
        		if(s1 >= s2) {
        			sum = sum + s1;
        		}else {
        			sum = sum - s1;
        		}
        	}else {
        		sum = sum + s1;
        	}
        }
        return sum;
    }


    public static void main(String []args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a Roman Number in capital letters: ");
        //String str = "IX";
        String str = sc.next();
    	int res = romToNum(str);
    
        System.out.println("The Integer value of given Roman number is: "+res);
        sc.close();
    }
}

 