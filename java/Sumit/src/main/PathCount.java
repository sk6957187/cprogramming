package main;

public class PathCount {
	
	public static int countPaths(int i, int j, int n,int m) {
		if(i==n || j==m || j==-1)
			return 0;
		if(i==n-1 && j==m-1)
			return 1;
		int downCount=countPaths(i+1, j, n, m);
		int rightCount=countPaths(i,j+1,n,m);
		return rightCount + downCount ;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int n=3, m=3;
		int totalPath=countPaths(0,0,n,m);
		System.out.println(totalPath);

	}

}
