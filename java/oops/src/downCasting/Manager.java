package downCasting;

class Manager {
	static void assignTask(SoftwareEngineer s) {
		s.meeting();
		if(s instanceof SoftwareDeveloper) {
			SoftwareDeveloper dev = (SoftwareDeveloper) s;
			dev.coding();
		}
		else if(s instanceof TestEngineer) {
			TestEngineer qa = (TestEngineer) s;
			qa.testing();
		}
	}
}
