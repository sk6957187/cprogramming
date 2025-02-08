package chainigConstructor;

class Amazon{
	Amazon(){
		System.out.println("Code to initialize shopping");
	}
	Amazon(double d){
		this();
		System.out.println("Code to initialize Prime Features");
	}
}

public class MainClass3 {
	public static void main(String[] args) {
		Amazon f1 = new Amazon(199.0);
	}

}
