package practice;

import java.util.ArrayList;
import java.util.List;

import main.starpattern;

public class Today6 {
	
	static boolean isPallindrom(String str) {
		str = str.toLowerCase();
		int l = str.length();
		if(l == 1) {
			return true;
		}
		int j = l-1;
		boolean res = true;
		for(int i=0; i<=l/2 && i<= j; i++) {
			if(str.charAt(i) != str.charAt(j--)) {
				res = false;
				return res;
			}
		}
		return res;
	}
	
	static String maxPallindrom(String str) {
		str = str.replace(" ", "");
		String pallindromStr = "";
		if(str.length() > 1) {
			for(int i=0; i<str.length()-1; i++) {
				for(int j=i+1; j<str.length()+1; j++) {
					boolean pall = isPallindrom(str.substring(i,j));
					if(pall) {
						pallindromStr = pallindromStr + str.substring(i, j) + " ";
//						System.err.println(str.substring(i, j));
					}
				}
			}
		}
		
		
//		System.out.println(" "+pallindromStr);
		String res = "";
		int resSize = 0;
		String[] strSplit = pallindromStr.split(" ");
		for(String s: strSplit) {
			if(s.length() > resSize) {
				res = s;
				resSize = s.length();
			}
		}
		return res;
		
	}

	public static void main(String[] args) {
		
		List<String> strList = new ArrayList<>(); 
		strList.add("abc");
		strList.add("aba");
		strList.add("abccbar");
		strList.add("abccbd");
		strList.add("I saw a racecar yesterday");
		strList.add("A man a plan a canal Panama");
		for(String str: strList) {
			System.out.println(str + "-> " +maxPallindrom(str));
		}
		
		
	}
}
