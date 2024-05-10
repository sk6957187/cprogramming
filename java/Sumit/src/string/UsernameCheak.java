package string;

import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UsernameCheak {
	 public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		Pattern search = Pattern.compile("[\\W]");
		//Pattern search = Pattern.compile("^[A_za-z][A-Z-a-z_0-9]{7,29}");
		int count=0;
		System.out.print("Enter numbers of name: ");
		int total = sc.nextInt();
		while(count<total){
			System.out.println("Enter "+ (count+1) +" user name");  
			String s= sc.next();
		    Matcher match = search.matcher(s);

		     if(s.length()<8 || s.length()>30 )
		      System.out.println("Invalid");



		     if(s.length()>=8 && s.length()<=30) 
		    	 if((Character.isUpperCase(s.charAt(0))||Character.isLowerCase(s.charAt(0))) && !match.find())
		    		 System.out.println("Valid"); 
		    	 else
		    		 System.out.println("Invalid");
		    count++;
		    }
		sc.close();
	}
}
