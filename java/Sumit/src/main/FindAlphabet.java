package main;
import java.util.*;

public class FindAlphabet {

    public static void main(String[] args) {
        
        Scanner sc=new Scanner(System.in);
        String A=sc.next();
        sc.close();
        /* Enter your code here. Print output to STDOUT. */
        if(A.charAt(0) == A.charAt(A.length()-1)){
            System.out.print("Yes");
        }
        else
            System.out.print("No");
    }
}