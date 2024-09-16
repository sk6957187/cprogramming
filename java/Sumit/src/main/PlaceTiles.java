package main;

public class PlaceTiles {

	public static int placeTiles(int n, int m) {
		if(n==m)
			return 2;
		if(n<m)
			return 1;
		int vertPlacement = placeTiles(n-2,m);
		int horPlacement = placeTiles(n-1,m);
		return vertPlacement + horPlacement;
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int n=5, m=4;
		System.out.println(placeTiles(n,m));

	}

}
