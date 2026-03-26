package spring;

public class Person {
	private Mobile mobile;

	public Mobile getMobile() {
		return mobile;
	}

	public void setMobile(Mobile mobile) {
		this.mobile = mobile;
	}
	
	public void use() {
		System.out.println("Person is using mobile.");
		mobile.ring();
	}
}
