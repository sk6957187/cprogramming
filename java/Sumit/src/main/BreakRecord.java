package main;
	import java.io.*;
	import java.util.*;
	import java.util.ArrayList;

	
	public class BreakRecord {
	    public static void main(String[] args) throws IOException {
	    	Scanner sc =new Scanner(System.in);
	    	System.out.print("Enter number of match:-");
	    	int n = sc.nextInt();
	    	sc.nextLine();
	        String scoresTemp = sc.nextLine();
	        String[] val=scoresTemp.split(" ");
	        

	        List<Integer> scores = new ArrayList<>();

	        for (int i = 0; i < n; i++) {
	            int scoresItem = Integer.parseInt(val[i]);
	            scores.add(scoresItem);
	        }
	        
	        List<Integer> result = breakingRecords(scores);
	        
	        System.out.println("Break Max record "+ result.get(0)+" times");
	        System.out.println("Break min record "+result.get(1)+" Times");
	        sc.close();
	    }
	    
	    public static List<Integer> breakingRecords(List<Integer> scores) {
	        int min=0;
	        int max=0;
	        int recMin=0;
	        int recMax=0;
	        List<Integer> list = new ArrayList<>();
	        recMax = scores.get(0);
	        recMin = recMax;
	        for(int i=1; i<scores.size(); i++){
	            if(recMin > scores.get(i)){
	                recMin = scores.get(i);
	                min++;
	            }
	            if(recMax < scores.get(i)){
	                recMax = scores.get(i);
	                max++;
	            }
	        }
	        list.add(max);
	        list.add(min);
	        return list;
	        

	    }
	}



