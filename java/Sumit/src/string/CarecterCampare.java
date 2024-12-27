package string;

import java.util.HashMap;
import java.util.Scanner;


/*input:-
s1 = "hello world"
s2 = "do"
Output 3 (d=1, o=2)

input:- 
s1 = "developer"
s2 = "dev"
output:- 5 (d=1, e=3, v=1)
*/

public class CarecterCampare {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String s1 = sc.next();
		String s2 = sc.next();
		sc.close();
		HashMap<Character, Integer> freqmap = new HashMap<>();
		for(char c: s1.toCharArray()) {
			freqmap.put(c, freqmap.getOrDefault(c, 0)+1);
		}
		int total=0;
		for(char c : s2.toCharArray()) {
			total += freqmap.getOrDefault(c, 0);
		}
		System.out.println(total);
		
		/*
		int count=0;
		for(int j=0; j<s2.length(); j++) {
			for(int i=0; i<s1.length(); i++) {
				if(s2.charAt(j) == (s1.charAt(i))) {
					count++;
				}
			}
		}
		System.out.println(count);
		*/

	}

}
