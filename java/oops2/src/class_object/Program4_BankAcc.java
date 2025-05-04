package class_object;

public class Program4_BankAcc {
	public static void main(String[] args) {
		BankAccount b1=new BankAccount();
		b1.accNo = 123455678;
		b1.bal=2345;
		b1.Withdraw();
		
		BankAccount b2 = new BankAccount();
		b2.accNo=111111111;
		b2.bal=23456;
		b2.Deposit();
		
	}
}
