package encapsulation;

public class Mainclass2 {
	public static void main(String[] args) {
		Employee e1 = new Employee();
		e1.setId(101);
		e1.setCtc(10001.0);
		System.out.println("Id: "+ e1.getId());
		System.out.println("CTC: "+ e1.getCtc());
	}
}
