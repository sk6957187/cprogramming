package encapsulation;

public class Person {
	private int age;
	public void setAge(int age) {
		//Authorized
		this.age = age;
	}
	public int getAge() {
		//Authorized
		return age;
	}
}
