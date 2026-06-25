package codeforce.program;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


//Code force question: 2366G

public class CriterionInBurlandia {
	static List<Integer>[] tree;
	static int[] value;
	static List<Integer> path;
	
	static boolean dfs(int u, int parent, int target) {
		path.add(u);
		
		if(u == target) {
			return true;
		}
		
		for(int v: tree[u]) {
			if(v != parent) {
				if(dfs(v,u,target)) {
					return true;
				}
			}
		}
		path.remove(path.size()-1);
		
		return false;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		System.out.println("test case: ");
		int t = sc.nextInt();
		
		while(t-- > 0) {
			System.out.println("n: ");
			int n = sc.nextInt();
			System.out.println("q: ");
			int q = sc.nextInt();
			
			int[] value = new int[n+1];
			for(int i=1; i<=n; i++) {
				value[i] = sc.nextInt();
			}
			
			tree = new ArrayList[n+1];
			
			for(int i=1;i<=n; i++) {
				tree[i] = new ArrayList<>();
			}
			
			for(int i=0; i<n-1; i++) {
				int u = sc.nextInt();
				int v = sc.nextInt();
				
				tree[u].add(v);
				tree[v].add(u);
			}
			
			while(q-- > 0) {
				int x = sc.nextInt();
				int y = sc.nextInt();
				
				path = new ArrayList<>();
				dfs(x,-1,y);
				
				int m = path.size();
				long ans = 0;
				
				for(int i=0; i<m; i++) {
					long sum = 0;
					int xor = 0;
					
					for(int j=i; j<m; j++) {
						int val = value[path.get(j)];
						
						sum += val;
						xor ^= val;
						if(xor >=sum) {
							ans++;
						}
					}
					
				}
			System.out.println(ans);
			}
			
		}
		sc.close();

	}

}
