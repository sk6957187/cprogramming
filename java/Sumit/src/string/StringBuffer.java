package string;

//import java.util.HashMap;
import java.util.Scanner;


/*
 Output:- 
 Word1 word2    output
 abc   def  ->  adbecf
 ab    defg ->  adbefg
 */

public class StringBuffer {

	public static String mergeAlternately(String word1, String word2) {
        int l1 = word1.length();
        int l2 = word2.length();
        //StringBuffer ans = new StringBuffer();
        String ans = ("");
        for (int i = 0; i < l1 || i < l2; i++) {
            if (i < word1.length()) {
                //ans.append(word1.charAt(i));
            	ans += word1.charAt(i);
            }
            if (i < word2.length()) {
                //ans.append(word2.charAt(i));
                ans += word2.charAt(i);
            }
        }
        //return ans.toString();
        return ans;
    }

	private void append(char charAt) {
		// TODO Auto-generated method stub
		
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		String word1 = sc.nextLine();
		String word2 = sc.nextLine();
//		String combinedWord = new String();
		String combinedWord = mergeAlternately(word1, word2);
		System.out.println(combinedWord);
		sc.close();

	}

}
