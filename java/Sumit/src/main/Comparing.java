package main;

import java.util.Scanner;

public class Comparing {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		int n;
		String[] plane;
		int count=0;
		String[] var;
		System.out.println("Enter no. of plane:");
		n = scan.nextInt();
		scan.nextLine();  					//take extra input itself
		plane = new String[n];
		System.out.println(("Enter plane details:"));
		for(int i=0; i<n; i++) {
			plane[i] = scan.nextLine();
		}
		System.out.println("Which country sending plane:");
		String Cname = scan.next();
		scan.close();
		for(String p : plane) {
			var = p.split(" ");
			if(Cname.equals(var[1])) {
				count++;
			}
		}
		System.out.println(count);
		System.out.println(n-count);
		String large = null;
		int lval = 0;
		if((n-count)>0) {
			for(String p: plane) {
				var = p.split(" ");
				if(!Cname.equals(var[1])) {
					System.out.println(p);
					if(large == null) {
						large = p;
						lval = Integer.parseInt(var[2]);
					}
					else if(Integer.parseInt(var[2]) > lval) {
						large = p;
						lval = Integer.parseInt(var[2]);
					}
				}
			}
			System.out.println(large);
		} else
			System.out.println("0");
	}

}
