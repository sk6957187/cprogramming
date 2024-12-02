package hasARelitionship;

class Camera{
	void takePhoto() {
		System.out.println("TakePhogto()...");
	}
}
class AirPods {
	void listen() {
		System.out.println("Listening to audio....");
	}
}
class Mobile{
	Camera cam = new Camera();
	AirPods ap = new AirPods();
}
public class Mainclass3 {
	public static void main(String[] args) {
		Mobile mb = new Mobile();
		mb.cam.takePhoto();
		mb.ap.listen();
	}
}
