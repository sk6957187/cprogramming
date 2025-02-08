package exception;

class OverSpeedException extends Exception{
	
}
 class HighwayPatrol {
	 static void checkSpeed(int speed) throws OverSpeedException {
		 if(speed > 80) {
			 throw new OverSpeedException();
		 }
	 }
 }
public class Mainclass2 {
	public static void main(String[] args) {
		try {
			HighwayPatrol.checkSpeed(68);
			HighwayPatrol.checkSpeed(78);
			HighwayPatrol.checkSpeed(108);
		} catch(OverSpeedException e) {
			e.printStackTrace();
		}
	}
}
