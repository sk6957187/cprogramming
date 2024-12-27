package string;
//
//import java.util.Scanner;
//
//public class Main {
//
//	public static void main(String[] args) {
//		// TODO Auto-generated method stub
//		Scanner sc = new Scanner(System.in);
//		System.out.println("Enter santence");
//		String Str = sc.nextLine();
//		System.out.println("Enter starting point (word position)");
//		int start = sc.nextInt();
//		System.out.println("Enter ending point (word position)");
//		int end = sc.nextInt();
//		sc.close();
//		System.out.println(Str.Contens(start,end));
//
//	}
//
//}


import java.util.Scanner;

public class SubString {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter sentence:");
        String sentence = sc.nextLine();
        System.out.println("Enter starting point (as a word or character):");
        String start = sc.next();
        System.out.println("Enter ending point (as a word or character):");
        String end = sc.next();
        sc.close();

        // Find the starting and ending indices within the sentence
        int startIndex = sentence.indexOf(start);
        System.out.println(startIndex);
        int endIndex = sentence.indexOf(end);
        System.out.println(endIndex);

        if (startIndex != -1 && endIndex != -1 && startIndex <= endIndex) {
            // Extract the substring
            String result = sentence.substring(startIndex, endIndex + end.length());
            System.out.println("Substring: " + result);
        } else {
            System.out.println("Invalid input. Please enter valid starting and ending points.");
        }
    }
}
