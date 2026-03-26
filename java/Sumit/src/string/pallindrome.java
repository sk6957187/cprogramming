package string;

public class pallindrome {
	public static void main(String[] args) {
		String s1 = "aba";
		String s2 = "";
//		for(int i=s1.length()-1; i>=0; i--) {
//			s2 = s2+s1.charAt(i);
//		}
//		if(s1.equals(s2)) {
//			System.out.println(s1+" is pallindrome.");
//		} else {
//			System.out.println(s1 +" is not pallindrome.");
//		}
		
		
//		boolean f = true;
//		int k=s1.length()-1;
//		for(int i=0; i<s1.length()/2; i++) {
//			if(s1.charAt(i) != s1.charAt(k)) {
//				f = false;
//				break;
//			}
//			k--;
//		}
//		if(f) {
//			System.out.println(s1+" is a pallindrome.");
//		}else {
//			System.out.println(s1+" is not a pallindrome.");
//		}
		
		s2 = new StringBuilder(s1).reverse().toString();
		if(s1.equals(s2)) {
			System.out.println("yes pallindrome");
		} else {
			System.out.println("No");
		}
	}
}
