package main;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Practice {
	
	public static void main(String[] args) {
		String s = "abacb";
		char[] str = s.toCharArray();
		System.out.println(s);
		String temp="";
		Set<Character> set = new HashSet<Character>();
		for(int i=0; i<s.length(); i++) {
			set.add(s.charAt(i));
		}
		int l=0; 
		System.out.println(set);
		
		for(char ch : set) {
			int n=0;
			boolean flag = false;
			for(int i=0; i<s.length(); i++) {
				if(ch == s.charAt(i)) {
					l=i;
//					n++;
					flag=true;
					break;
					
				}
			}
			if(flag) {
				str[l]='$';
				
			}
			
		}
		System.out.println(Arrays.toString(str));
	}
}