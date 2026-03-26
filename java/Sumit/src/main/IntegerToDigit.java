package main;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class IntegerToDigit {
	
	private static void collectDigit(int n, List<Integer> digitList) {
		// TODO Auto-generated method stub
		if(n/10>0) {
			collectDigit(n/10,digitList);
		}
		digitList.add(n%10);
		
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		System.out.print("Enter the number:");
		int n = sc.nextInt();
		List<Integer> digitList = new ArrayList<>();
		collectDigit(n, digitList);
		Collections.sort(digitList);
		int max = 1;
		for(Integer a: digitList) {
			System.out.print(a+" ");
		}
		System.out.println("");
		for(int i=0; i<digitList.size()-1; i++) {
			int a = digitList.get(i);
			int count=1;
			for(int j=i+1; j<digitList.size();j++) {
				if(a== digitList.get(j)) {
					count +=1;
					i++;
				}
			}
			if(max < count) {
				max=count;
			}
		}
		System.out.println("maximum count "+max);
		sc.close();

	}

	

}
