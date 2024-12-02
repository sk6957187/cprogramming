package class_object;

class Student {
	String name;
	int id;
	void study() {
		System.out.println("Student "+name+" is studying");
	}
	void sleep() {
		System.out.println("Student "+name+" is sleeping.");
	}
}
public class Program2{
	public static void main(String[] args) {
		Student s1=new Student();
		s1.name="Ram";
		s1.id=101;
		s1.sleep();
		
		Student s2 = new Student();
		s2.name="Sita";
		s2.id = 102;
		s2.sleep();
		
		
	}
}
