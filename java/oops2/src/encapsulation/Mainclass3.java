package encapsulation;

public class Mainclass3 {
	public static void main(String[] args) {
		Account acc = new Account();
		acc.setAccbal(123343.0);
		acc.setAccNum(1234567890987543L);
		System.out.println("Account number: "+acc.getAccNum());
		System.out.println("Account balance: "+acc.getAccBal());
		
	}
}
