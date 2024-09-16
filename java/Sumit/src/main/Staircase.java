package main;

import java.io.*;
import java.util.*;

public class Staircase {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        	staircase(n);
	        sc.close();
	    }
	    
    public static void staircase(int n) {
	    // Write your code here
    	for(int i=1; i<=n; i++){
    		for(int j=n; j>0; j--){
    			if(j==i || j<i)
    				System.out.print("#");
		        else 
		            System.out.print(" ");
            }
    		System.out.println();
	    }
   }
}



