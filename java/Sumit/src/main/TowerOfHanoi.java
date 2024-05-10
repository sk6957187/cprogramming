package main;

public class TowerOfHanoi {
	

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int n=3;
		towerOfHanoi(n,"S","H","D");
	}

	public static void towerOfHanoi(int n, String src, String help, String dest) {
		if(n==1) {
			System.out.println("Transfer disk "+n+"from "+src+"to "+dest);
			return;
		}
		towerOfHanoi(n-1, src, dest, help);
		System.out.println("Transfer disk "+n+"from "+src+"to "+dest);
		towerOfHanoi(n-1, help, src, dest);
	}
	

}
