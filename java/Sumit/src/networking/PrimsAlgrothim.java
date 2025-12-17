package networking;

import java.util.Scanner;

public class PrimsAlgrothim {
	
	static int minKey(int[] key, boolean[] markSet) {
		int min = Integer.MAX_VALUE;
		int index = -1;
		
		for(int i = 0; i < key.length; i++) {
			if(!markSet[i] && key[i] < min) {
				min = key[i];
				index = i;
			}
		}
		
		return index;
	}
	
	private static int[] primsMST(int[][] graph) {
	int l = graph.length;
		
		boolean[] markSet = new boolean[l];
		int[] parent = new int[l];
		int[] key = new int[l];
		
		for (int i = 0; i < l; i++) {
            key[i] = Integer.MAX_VALUE;
        }
		
		key[0] = 0;
		parent[0] = -1;
		for(int i=0; i<l-1; i++) {
			int min = minKey(key, markSet);
			markSet[i] = true;
			
			for(int j = i+1; j<l; j++) {
				if(graph[i][j] != 0 && !markSet[j] && graph[i][j] < key[j]) {
					parent[j] = min;
					key[j] = graph[i][j];
				}
			}
			
		}
		
		return parent;
	}
	
	

	public static void main(String[] args) {
		 int[][] graph = {
		            {0, 2, 0, 6, 0},
		            {2, 0, 3, 8, 5},
		            {0, 3, 0, 0, 7},
		            {6, 8, 0, 0, 9},
		            {0, 5, 7, 9, 0}
		        };
		 int[] result = primsMST(graph); 
		 
		 System.out.println("Edge \tWeight");
	        for (int i = 1; i < graph.length; i++) {
	            System.out.println(result[i] + " - " + i + "\t" + graph[i][result[i]]);
	        }
	}



}
