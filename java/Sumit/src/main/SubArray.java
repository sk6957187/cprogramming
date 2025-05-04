package main;

import java.util.HashSet;
import java.util.Scanner;

public class SubArray {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int arr[] = {2,2,2,1,7,5,3};
        int l = arr.length;
        int count = 0;
        HashSet<String> map = new HashSet<>();
        for(int i=0; i<l-1; i++) {
        	for(int j=i+1; j<l; j++) {
        		int sum = arr[i]+arr[j];
//        		if((sum%2)==0) {
//        			count++;
//        			System.out.print("("+arr[i]+","+arr[j]+")");
//        			//break;
//        		}
        		String pair = "(" + arr[i]+","+arr[j]+")";
//				  String pair = "(" + first + "," + second + ")";
	        	if(sum%2 == 0) {
        			if(map.add(pair)) {
	        			count++;
	        			System.out.print(pair+" ");
	        		}
	        	}
        	}
        }
        System.out.println(count);
        sc.close();
    }

}

