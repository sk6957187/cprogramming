package main;

import java.util.Arrays;
import java.util.Scanner;

public class SmallestPrimeNum {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String[] arr = sc.nextLine().split(" ");
		sc.close();
		Arrays.sort(arr);
		int mul=1;
		for(int i=1; i<arr.length; i++) {
			mul = mul * Integer.parseInt(arr[i]);
		}
		long n=100000;
		for(int i = mul; i <= 100; i++) {
			System.out.println("i="+i);
			boolean prime=primeNu(mul);
			if(prime) {
				System.out.println(i);
				break;
			}
			else {
				System.out.println("None" + i);
			}
		}

	}
	
	public static boolean primeNu(int num) {
		  if (num <= 1) {
	            return false;
	        }
	        for (int i = 2; i <= num / 2; ++i) {
	            if (num % i == 0) {
	            	System.out.println("111");
	                return false;
	            }
	        }
	        return true;
	    
		
	}

}
