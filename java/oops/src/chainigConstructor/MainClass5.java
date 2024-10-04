package chainigConstructor;

class Alpha{
	Alpha(){
		this(10);
		System.out.println("Alpha()...");
	}
	Alpha(int a){
		System.out.println("Alpha(int)....");
	}
}
class Beta extends Alpha{
	Beta(){
		System.out.println("Beta()...");
	}
	Beta(int a){
		this();
		System.out.println("Beta(int)...");
	}
}
public class MainClass5 {
	public static void main(String[] args) {
		Beta ref = new Beta(15);
	}
}
