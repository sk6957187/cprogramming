package exception;

class InsufficintBalance extends RuntimeException{
	
}
class VerifyBalance {
	static void checkBalance(int bal) {
		if(bal < 1000) {
			throw new InsufficintBalance();
		}
	}
}
public class mainclass6 {
	public static void main(String[] args) {
		try {
			VerifyBalance.checkBalance(1234);
			VerifyBalance.checkBalance(12354);
			VerifyBalance.checkBalance(123);
		} catch (InsufficintBalance e) {
			e.printStackTrace();
		}
	}
}

