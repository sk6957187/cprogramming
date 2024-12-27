package main;

import java.util.*;
import java.util.Collections;

public class ArrayList {
	public static void main(String[] args) {
		int[] arr = {1, 2, 3};
	    Collections.reverse(Arrays.asList(arr));
	    System.out.println("Reversed array: " + Arrays.asList(arr));
	    for (Integer a : arr) {
	        System.out.print(a + " ");
	    }
	    System.out.println();
	
	    //List<Integer> arrList = new ArrayList<>();
	    //List<String> arrList = new ArrayList<>();
	    List <Integer> arrList = new java.util.ArrayList<>();
	    
	    arrList.add(6);
	    arrList.add(5);
	    arrList.add(3);
	
	    System.out.println("ArrayList: " + arrList);
	}
}
