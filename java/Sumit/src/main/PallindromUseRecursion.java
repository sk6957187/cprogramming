package main;
public class PallindromUseRecursion {
	static boolean check(int i, String str,int j) {
		if(i==str.length()-1)
			return true;
		if(str.charAt(i)!= str.charAt(j))
			return false;
		return check(i+1,str,j-1);
		
		
		
		
//		
//		if(n>str.length()/2) {
//			return true;
//		}
//		if(str.charAt(n) == str.charAt(str.length()-1-n)) {
//			boolean res = check(n+1, str);
//			if(res == false) {
//				return false;
//			}else {
//				return true;
//			}
//		} else {
//			return false;
//		}
	}
	public static void main(String[] args) {
		String str = "Radar";
		boolean res = check(0, str,str.length()-1);
		System.out.println(res);
	}
}
