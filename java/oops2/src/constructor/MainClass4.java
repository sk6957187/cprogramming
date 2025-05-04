package constructor;

class AntiVirus{
	AntiVirus(){
		System.out.println("Local server scan.");
	}
	AntiVirus(double d){
		System.out.println("Full scan.");
	}
	AntiVirus(String s){
		System.out.println("Full scan + servar sacn");
	}
}

public class MainClass4 {

	public static void main(String[] args) {
		AntiVirus a1 = new AntiVirus();
		AntiVirus a2 = new AntiVirus(1.1);
		AntiVirus a3 = new AntiVirus("Super");

	}

}
