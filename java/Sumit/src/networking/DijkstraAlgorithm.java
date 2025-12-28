package networking;

import java.util.Arrays;

public class DijkstraAlgorithm {

	private static void dijkstra(int[][] graph, int src) {
		int V = graph.length;
		
		int[] dist = new int[V];
        boolean[] visited = new boolean[V];
        
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
		for(int i=0; i<V-1; i++) {
			int minDist = minDistance(dist, visited);
			visited[minDist] = true;
			
			for(int v=0; v<V; v++) {
				if(!visited[v] && graph[minDist][v] != 0 && dist[minDist] != Integer.MAX_VALUE 
						&& dist[minDist] + graph[minDist][v] < dist[v]) {
					
					dist[v] = dist[minDist] + graph[minDist][v];
				}
			}
		}
		
		for (int i = 0; i < dist.length; i++) {
            System.out.println(i + " \t\t " + dist[i]);
        }
		
	}

	
	private static int minDistance(int[] dist, boolean[] visited) {
		int min = Integer.MAX_VALUE;
		int minIndex = -1;
		for(int v=0; v<dist.length; v++) {
			if(!visited[v] && dist[v] < min) {
				min = dist[v];
				minIndex = v;
			}
		}
		
		return minIndex;
	}


	public static void main(String[] args) {
		 int[][] graph = {
	                {0, 4, 0, 0, 0, 0, 0, 8, 0},
	                {4, 0, 8, 0, 0, 0, 0, 11, 0},
	                {0, 8, 0, 7, 0, 4, 0, 0, 2},
	                {0, 0, 7, 0, 9, 14, 0, 0, 0},
	                {0, 0, 0, 9, 0, 10, 0, 0, 0},
	                {0, 0, 4, 14, 10, 0, 2, 0, 0},
	                {0, 0, 0, 0, 0, 2, 0, 1, 6},
	                {8, 11, 0, 0, 0, 0, 1, 0, 7},
	                {0, 0, 2, 0, 0, 0, 6, 7, 0}
	        };
		 
		 dijkstra(graph, 0);

	}


}
