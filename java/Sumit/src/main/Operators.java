package main;

import java.util.Scanner;

public class Operators {

	public static void main(String[] args) {
		int n=5;
		int pos=2;
		int newbitMask = 1 << pos;
		int newNumber = newbitMask & n;
		System.out.println("Get operatin- "+ newNumber);
		
		//set
		pos = 1;
		int bitMask = 1 << pos;
		newNumber = bitMask | n;
		System.out.println("Set operation- "+newNumber);
		
		//clear
		pos = 2;
		bitMask = 1 << pos;
		newbitMask = ~(bitMask);
		newNumber = newbitMask & n;
		System.out.println("Clear- "+newNumber);
		
		//Update 
		//for 1->Set 0->clear
		Scanner sc = new Scanner(System.in);
		System.out.println("for 1->Set 0->clear");
		int oper=sc.nextInt();
		pos=1;
		bitMask = 1<<pos;
		if(oper == 1) {
			newNumber = bitMask | n;
			System.out.println("For update(set)-"+newNumber);
		}
		else {
			newbitMask = ~(bitMask);
			newNumber = newbitMask & n;
			System.out.println("For update(Clear)- "+newNumber);
		}
		sc.close();
	}

}
