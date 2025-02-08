package exception;

class InvaidMobileNumberException extends Exception {
	
}

class MobileNumberVerifier {
	static void verifyMobileNumber(String num) throws InvaidMobileNumberException{
		if(num.length() != 10) {
			throw new InvaidMobileNumberException();
		}
	}
}
public class Mainclass3 {
	public static void main(String[] args) {
		try {
			MobileNumberVerifier.verifyMobileNumber("1234567890");
			MobileNumberVerifier.verifyMobileNumber("1234567889");
			MobileNumberVerifier.verifyMobileNumber("1255345678901");
		}
		catch (InvaidMobileNumberException e) {
			e.printStackTrace();
		}
	}
}
