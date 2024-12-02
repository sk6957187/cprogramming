package main;

public class PatterPrintf {
	public static void main(String[] args) {
		int n =5;
		int x =1;
	
		System.out.println("Square:-");
		x=1;
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				System.out.printf("%3d",x);  //print -> when required equal space for all digit, here all digit required 3 space because here all number are 1 or 2 digit and 1 extra space for separation. 
				x++;
			}
			System.out.println();
		}
		System.out.println("Triangle 1:-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<=i; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		System.out.println("Triangle 2:-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<n-1-i; j++) {
				System.out.print("  ");
			}
			for(int j=0; j<=i; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		System.out.println("Reverse Triangle 1:-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<i; j++) {
				System.out.print("  ");
			}
			for(int j=i; j<n; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		System.out.println("Reverse Triangle 2:-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<n-i; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		System.out.println("Mounten 1:-");
		for(int i=1; i<=n; i++) {
			for(int j=1; j<=n-i; j++) {
				System.out.print(" ");
			}
			for(int j=1; j<=i; j++) {
				System.out.print(" *");
			}
			System.out.println();
		}
		System.out.println("Mounten 2:-");
		for(int i=0; i<n; i++) {
			for(int j=i; j<n-1; j++) {
				System.out.print("  ");
			}
			for(int j=0; j<=i; j++) {
				System.out.print("* ");
			}
			for(int j=0; j<i; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
			
		System.out.println("Reverse Mounten:-");
		for(int i=0; i<n; i++) {
			for(int j=0; j<i; j++) {
				System.out.print("  ");
			}
			for(int j=i; j<n; j++) {
				System.out.print("* ");
			}
			for(int j=i; j<n-1; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		System.out.println("PELLET_DRUM:- ");
		for(int i=0; i<n-1; i++) {
			for(int j=0; j<i; j++) {
				System.out.print("  ");
			}
			for(int j=i; j<n; j++) {
				if(i==n-1&&i==j)
					continue;
				//System.out.print(i+""+j);
				System.out.print("* ");
			}
			for(int j=i; j<n-1; j++) {
				
				System.out.print("* ");
			}
			System.out.println();
		}
		for(int i=0; i<n; i++) {
			for(int j=0; j<n-i-1; j++) {
				System.out.print("  ");
			}
			for(int j=0; j<=i; j++) {
				System.out.print("* ");
			}
			for(int j=0; j<i; j++) {
				System.out.print("* ");
			}
			
			System.out.println();
		}
		System.out.println("PELLET_DRUM 2 :-");
		for(int i=1;i<=n;i++) {
			
			for(int j=1;j<=i;j++) {
				System.out.print("* ");
			}
			
			for(int j=1;j<=2*(n-i)-1;j++)
			{
				System.out.print("  ");
			}
			
			for(int j=1;j<=i;j++) {
				if(i==n&&i==j)
					continue;
				System.out.print("* ");
			}
			System.out.println();
		}
		for(int i=1; i<n; i++) {
			for(int j=1; j<=n-i; j++) {
				System.out.print("* ");
			}
			for(int j=1; j<=2*i-1; j++) {
				System.out.print("  ");
			}
			for(int j=i; j<n; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		System.out.println("Diamond Pattern:-");
		for(int i=1; i<=n; i++) {
			for(int j=1; j<=n-i; j++) {
				System.out.print("  ");
			}
			for(int j=1; j<=2*i-1; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		for(int i=n-1; i>=1; i--) {
			for(int j=1; j<=n-i; j++) {
				System.out.print("  ");
			}
			for(int j=1; j<=2*i-1; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		
	}
}
