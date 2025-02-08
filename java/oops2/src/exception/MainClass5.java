package exception;
class PincodeException extends Exception{
	
}
class Pincode {
	static void checkPincode(String pin) throws PincodeException {
		if(pin.length() !=6) {
			throw new PincodeException();
		}
	}
}
public class MainClass5 {
	public static void main(String[] args) {
		try {
			Pincode.checkPincode("560076");
			Pincode.checkPincode("560076");
			Pincode.checkPincode("5600766");
		} catch (PincodeException e) {
			e.printStackTrace();
		}
	}
}
