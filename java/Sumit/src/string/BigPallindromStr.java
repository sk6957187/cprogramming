package string;

public class BigPallindromStr {
	public static boolean isPalindrom(String s) {
		int i = 0;
		int j=s.length()-1;
		while(i<j) {
			if(s.charAt(i) != s.charAt(j)) {
				return false;
			}
			i++;
			j--;
		}
		return true;
		
	}
	
	public static void main(String[] args) {
		String str = "";
//		str = "bccbkhkaba";
		str = "abcacbadefe";
		String pallindrom = "";
		for(int i=0; i<str.length()-1; i++)
		{
			for(int j=i+1; j<str.length(); j++) {
				if(str.charAt(i)==str.charAt(j)) {
					boolean res = isPalindrom(str.substring(i, j+1));
					if(res) {
						pallindrom = pallindrom + str.substring(i, j+1)+" ";
					}
				}
			}
		}
		System.out.println("Substring: "+pallindrom);
		String[] strSplit = pallindrom.split(" ");
		int len = 0;
		int index = 0;
		for(int i=0; i<strSplit.length; i++) {
			int lenTemp = strSplit[i].length();
			if(lenTemp>len) {
				len = lenTemp;
				index = i;
			}
		}
		System.out.println("Longest substring pallindrom: "+strSplit[index]);
		
	}
 }




