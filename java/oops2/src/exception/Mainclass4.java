package exception;

class LimitExceedException extends RuntimeException {
	
}
class Atm {
	static int attempt=0;
	static void checkAttempt() {
		attempt++;
		if(attempt > 5) {
			throw new LimitExceedException();
		}
	}
}
public class Mainclass4 {
	public static void main(String[] args) {
		try {
			Atm.checkAttempt();
			Atm.checkAttempt();
			Atm.checkAttempt();
			Atm.checkAttempt();
			Atm.checkAttempt();
			Atm.checkAttempt();
		} catch (LimitExceedException e) {
			e.printStackTrace();
		}
	}
}
