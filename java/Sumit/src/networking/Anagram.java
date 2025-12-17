package networking;

import java.util.Arrays;

public class Anagram {
	public static boolean isAnagram(String str1, String str2) {
		if(str1.equals(str2)) {
			return true;
		}
		char[] ch1 = str1.toCharArray();
		char[] ch2 = str2.toCharArray();
		Arrays.sort(ch1);
		Arrays.sort(ch2);
		String str3 = new String(ch1);
		String str4 = new String(ch2);
		return str3.equals(str4);
	}
	public static void main(String[] args) {
		String str1 = "cat";
		String str2 = "act";
		boolean res = isAnagram(str1, str2);
		if(res) {
			System.out.println("Anagram");
		} else {
			System.out.println("Not Anagram");
		}
	}
}
