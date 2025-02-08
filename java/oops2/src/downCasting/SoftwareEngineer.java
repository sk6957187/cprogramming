package downCasting;

class SoftwareEngineer {
	void meeting() {
		System.out.println("Meeting()...");
	}
}
class SoftwareDeveloper extends SoftwareEngineer{
	void coding() {
		System.out.println("Coding()...");
	}
}
class TestEngineer extends SoftwareEngineer{
	void testing() {
		System.out.println("Testing()...");
	}
}
