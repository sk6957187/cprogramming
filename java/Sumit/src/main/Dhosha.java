package main;

public class Dhosha {
	public static void main(String[] args) {
		float dhosha =135f; int n =6;
		float sum = n*dhosha;
		float gst = sum *18/100;
		float totalSum = gst+ sum;
		System.out.println("Total sum: "+ totalSum);
	}
}
