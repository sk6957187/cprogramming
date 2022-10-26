import java.util.Scanner;
public class area {
	public static void main(String[] args) {
	int x,y,area;
	Scanner sc=new Scanner(System.in);
	System.out.println("Enter the first side:");
	x=sc.nextInt();
	System.out.println("Enter the second side:");
	y=sc.nextInt();
	area=x*y;
	System.out.println("Area"+area+" is "+area);	
	}
}