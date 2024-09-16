package main;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;

public class RomanNumber {
	    public static void main(String[] args) throws IOException {
	        BufferedReader br =
	            new BufferedReader(new InputStreamReader(System.in));

	        int tc = Integer.parseInt(br.readLine().trim());
	        while (tc-- > 0) {
	            String roman = br.readLine().trim();
	            //Solution ob = new Solution();
	            System.out.println(romanToDecimal(roman));
	        }
	    }

		private static int romanToDecimal(String str) {
			HashMap <Character, Integer> map = new HashMap<>();
	        map.put('I',1);
	        map.put('V',5);
	        map.put('X',10);
	        map.put('L',50);
	        map.put('C',100);
	        map.put('D',500);
	        map.put('M',1000);
	        int ans=0;
	        int prev=0;
	        for(int i=str.length()-1; i>=0; i--){
	            char c = str.charAt(i);
	            if(map.get(c)<prev){
	                ans-=map.get(c);
	            }
	            else{
	                ans += map.get(c);
	            }
	            prev = map.get(c);
	        }
	        return ans;
		}
}
	

//	class Solution {
//	    // Finds decimal value of a given roman numeral
//	    public int romanToDecimal(String str) {
//	        // code here
//	        
//	        
//	    }
//	}


