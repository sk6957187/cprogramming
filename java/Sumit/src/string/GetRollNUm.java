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
			System.out.print("Integer: ");
			roll[i]=sc.nextInt();
		}
		sc.next();
		//int[] roll= {11,18,22,26,30};
		System.out.println("String :");
		String[] name=sc.nextLine().split(" ");
		//String[] name = {"Abb", "bb", "cc", "dd", "ee"};
		String result= getRoll(n,roll,name);
		System.out.println(result);
		sc.close();
		
	}

	private static String getRoll(int n, int[] roll, String[] name) {
		String result= "";
		System.out.println("hjhj");
		for(int i=0; i<n; i++) {
			if(roll[i]>=20 && roll[i]<=30) {
				//System.out.print(i+" ");
				result +=name[i]+" ";
				result +=Integer.toString(roll[i]);
				result +=", ";
			}
		}
		System.out.println("result: "+result);
		return result;
	}
}
