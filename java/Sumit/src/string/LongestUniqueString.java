package string;

public class LongestUniqueString {
	public static boolean isUnique(String str) {
		for(int i=0; i<str.length()-1; i++) {
			for(int j=i+1; j<str.length(); j++) {
				if(str.charAt(i)==str.charAt(j)) {
					return false;
				}
			}
		}
		return true;
	}
	public static void main(String[] args) {
		String str = "abcdambhld";
		String strUniq = "";
		int len = 0;
		for(int i=0; i<str.length()-1; i++) {
			for(int j=i+1; j<str.length(); j++) {
				if(str.charAt(i)==str.charAt(j)) {
					String subStr = str.substring(i,j);
					if(isUnique(subStr)) {
						int lenTemp = subStr.length();
						if(lenTemp > len) {
							len = lenTemp;
							strUniq = subStr;
						}
					}
				}
			}
		}
		System.out.println(strUniq);
	}
}
