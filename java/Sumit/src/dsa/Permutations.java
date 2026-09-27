package dsa;

public class Permutations {
	
	static void permutation(String str, int index) {
		if(str.length() == index) {
			System.out.println(str);
			return;
		}
		
		for(int i=index; i<str.length(); i++) {
			
			String original = str;
			
			if(i != index) {
				char temp1 = str.charAt(index);
				char temp2 = str.charAt(i);
				str = str.substring(0, index) + temp2 + str.substring(index+1, i) + temp1 + str.substring(i+1);
			}
			
			permutation(str, index+1);
			
			str = original;
			
		}
	}
	
	public static void main(String[] args) {
		String str = "abcd";
		permutation(str,0);
	}
}
