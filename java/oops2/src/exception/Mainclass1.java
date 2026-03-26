package exception;
class CustomException extends Exception {
	
}

class Trigger {
	static void verify(int num) throws CustomException {
		if(num%5 == 0) {
			throw new CustomException();
		}
	}
}
public class Mainclass1 {
	public static void main(String[] args) {
		try {
			Trigger.verify(24);
			Trigger.verify(30);
		} catch(CustomException e) {
			e.printStackTrace();
		}
	}
}
