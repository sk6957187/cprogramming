package class_object;

public class Program3 {
	public static void main(String[] args) {
		LoginPage lp1 = new LoginPage();
		lp1.createAccount();
		System.out.println("----------------");
		LoginPage lp2 = new LoginPage();
		lp2.userName = "Sumit";
		lp2.password = "Sumit123456";
		lp2.login();
		System.out.println("---------------");
		LoginPage lp3 = new LoginPage();
		lp3.userName = "Sumit";
		lp3.forgotPassword();
		
	}
}
