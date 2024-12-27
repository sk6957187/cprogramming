package string;

import java.util.*;
import java.util.Scanner;

public class AddString {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		 //List<String> list = Arrays.asList("hi", "hello", "bye");
		  //  ArrayList<String> al = new ArrayList<String>();
		  //  al.addAll(list);
		int n = sc.nextInt();
		sc.nextLine();
		ArrayList<String> str = new ArrayList<String>();
		for(int i=0; i<n; i++) {
			String temp = sc.nextLine();
			str.add(temp);
		}
		String[] arr;
		System.out.println("Enter integer number with space seprated: ");
		arr = sc.nextLine().split(" ");
		Arrays.sort(arr);
		for(int i=0; i<arr.length; i++) {
			System.out.print(arr[i]);
		}
		System.out.println();
		System.out.println(str);

//		String[] str;
//		str = new String[4];
//		String temp;
//		temp=null;
//		String temp1=temp;
//		for( int i=0; i<4; i++){
//			str[i] = sc.nextLine();
//		}
//		for(int i=0; i<4; i++) {
//			if(i==0 ||(i%2)==0 && i!= 4) {
//			temp1=str[i].concat(str[i+1]);
//			}
//		}
//		temp=temp1;
//		System.out.println(temp);
		sc.close();
	}

}
