package main;

public class PrintPattern {

	public static void printPattern(String str, String permutation) {
		if(str.length()==0) {
			System.out.println(permutation);
			return;
		}
		for(int i=0; i<str.length(); i++) {
			char currChar = str.charAt(i);
			String newStr = str.substring(0, i)+str.substring(i+1);
			printPattern(newStr, permutation + currChar);
		}
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "abcd";
		// abc (shiting arrengement) - abc,acb,bac,bca,...
		printPattern(str,"");

	}

}
