package main;

public class SquarePattern {
	public static void main(String[] args) {
		int n=5;
		System.out.println("");
		n=5;
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				System.out.print(j+" ");	
			}
			System.out.println();
		}
		System.out.println();
		
		
		for(int i=1; i<=n; i++) {	
			char c=97;
			for(int j=1; j<=n; j++) {
				System.out.print(c+" ");
				c++;
			}
			System.out.println();
		}
		System.out.println();
		
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				if(j%2==0) {
					System.out.print(1+" ");
				}else {
					System.out.print(0+" ");
				}
			}
			System.out.println();
		}
	}

}
