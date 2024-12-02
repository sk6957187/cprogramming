package methodeOverriding;

class FacebookOld{
	void reaction() {
		System.out.println("Like");
	}
}
class FacebookNew extends FacebookOld{
	@Override
	void reaction() {
		System.out.println("Like, wow, sad, angry, haha, care");
	}
}
public class Mainclass1 {
	public static void main(String[] args) {
		FacebookOld fbOld = new FacebookOld();
		fbOld.reaction();
		FacebookNew fbNew = new FacebookNew();
		fbNew.reaction();
		FacebookOld ref = new FacebookNew();
		ref.reaction();
	}
}
