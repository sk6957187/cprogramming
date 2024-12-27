package main;

import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class Regex
{
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
		int testCases = Integer.parseInt(sc.nextLine());
		while(testCases>0){
			String pattern = sc.nextLine();
          	//Write your code
            try{
                Pattern.compile(pattern);
                System.out.println("Valid");
            } catch(PatternSyntaxException ex){
                System.out.println("Invalid");
            }
            testCases--;
		}
		sc.close();
/*	Input:-
		3
		([A-Z])(.+)
		[AZ[a-z](a-z)
		batcatpat(nat
	Output:-
		Valid
		Invalid
		Invalid
*/
	}
}
