package string;

import java.util.Scanner;

public class GetRollNUm {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter no. of student");
		int n = sc.nextInt();
		//int n=5;
		int[] roll= new int[n];
		for(int i=0; i<n; i++) {
			roll[i]=sc.nextInt();
		}
		sc.next();
		//int[] roll= {11,18,22,26,30};
		String[] name=sc.nextLine().split(" ");
		//String[] name = {"Abb", "bb", "cc", "dd", "ee"};
		String result= getRoll(n,roll,name);
		System.out.println(result);
		
	}

	private static String getRoll(int n, int[] roll, String[] name) {
		String result= "";
		for(int i=0; i<n; i++) {
			if(roll[i]>=20 && roll[i]<=30) {
				//System.out.print(i+" ");
				result +=name[i]+" ";
				result +=Integer.toString(roll[i]);
				result +=", ";
			}
		}
		
		return result;
	}
}
