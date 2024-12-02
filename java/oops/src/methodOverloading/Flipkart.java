package methodOverloading;

public class Flipkart {
	void payment() {
		System.out.println("COD");
	}
	void payment(long card) {
		System.out.println("Card");
	}
	void payment(String upi) {
		System.out.println("UPI");
	}
	void payment(String un, String pass) {
		System.out.println("Netbanking");
	}
}
