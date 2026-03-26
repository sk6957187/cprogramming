package main;
import java.util.*;
//import java.util.HashSet;
public class PracticeJJ {
	public static void main(String[] args) 
	{
		Integer[] arr= {12,12,13,14,14,16,13,12,14};
		HashSet<Integer> hash=new HashSet();
		
//		Collections.addAll(hash,arr);
//		ArrayList<Integer> ar=new ArrayList<>();
		
		for(int r=0;r<=arr.length-1;r++)
		{
			hash.add(arr[r]);
		}
		ArrayList al=new ArrayList(hash);
		System.out.println(hash);
	}
}
