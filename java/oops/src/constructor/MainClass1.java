package constructor;

class Amazon{
	Amazon(){
		System.out.println("Normal Amazon account: Shopping");
	}
	Amazon(double fees){
		System.out.println("Prime Amazon Account: Shopping, Video, Music");
	}
}

public class MainClass1 {
	
	
	public static void main(String[] args) {
		System.out.println("Main program start..");
		Amazon a1 = new Amazon();
		Amazon a2 = new Amazon(999.0);
		System.out.println("Main program ends..");
	}
}
