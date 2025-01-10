package main;

import java.util.HashMap;

public class Today {
	public static void main(String[] args) {
		HashMap<Character, Integer> hm= new HashMap<>();
		hm.put('a', 1);
		hm.put('e', 4);
		hm.put('i', 9);
		String str = "aeei";
		int sum =0 ;
		for(int i=0; i<str.length(); i++) {
			sum += hm.get(str.charAt(i));
		}
		System.out.println(sum);

	}
}
