package methodOverloading;

public class MainClass1 {
	public static void main(String[] args) {
		Flipkart obj = new Flipkart();
		obj.payment();
		obj.payment(1223456785434567L);
		obj.payment("Sumit@upi");
		obj.payment("Sumit@123","Sumit122");
	}
}
