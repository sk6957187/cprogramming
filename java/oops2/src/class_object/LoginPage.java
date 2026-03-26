package class_object;

class LoginPage{
	String userName;
	String password;
	void login() {
		System.out.println("Login with : "+userName+" and "+password);
	}
	void createAccount() {
		System.out.println("Redirect to create Account page");
	}
	void forgotPassword() {
		System.out.println("Account Recovery option for "+userName);
	}
}



