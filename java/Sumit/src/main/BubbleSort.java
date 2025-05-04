package main;

import java.util.*;

public class BubbleSort{
	public static void main(String[] args){
    	Scanner sc=new Scanner(System.in);
      	int n = sc.nextInt();
      	int[] array= new int[n];
      	for(int i=0; i<n; i++){
        	array[i] = sc.nextInt();
        }
      	int res = minSwaps(n, array);
        System.out.println(res);
        sc.close();
    }
  
  	static int minSwaps(int n, int[] array) {
      int desc = 1;  
      int ascc = 1;
        for (int i = 0; i < n; i++) {
        	for(int j=i+1; j<n; j++)
        		if (array[j] < array[i]) {
	          		int temp= array[i];
	          		array[i]=array[j];
	          		array[j]=temp;
	                desc++;
	                System.out.println("de ="+i);
	                printArray(array);
	                
	            } 
//          	else if (array[i] > array[i - 1]) {
//            	int temp=array[i];
//            	array[i]=array[i-1];
//            	array[i]=temp;
//                ascc++;
//                System.out.println("as -"+i);
//                printArray(array);
//            }
        }
        System.out.println("as =" + ascc );
        System.out.println("de = "+ desc);

        int maxCount = Math.min(ascc, desc);
        int minSwaps = n - maxCount;

        return minSwaps;
    }
  	static void printArray(int[] array) {
  		for(int i=0; i<array.length; i++) {
  			System.out.print(array[i]+" ");
  		}
  	}
}
