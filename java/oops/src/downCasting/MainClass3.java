package downCasting;

public class MainClass3 {
	public static void main(String[] args) {
		Manager.assignTask(new SoftwareDeveloper());
		System.out.println();
		Manager.assignTask(new TestEngineer());
	}
}
