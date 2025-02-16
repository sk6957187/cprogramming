package model;


public class EmployeeConfig {

	private int id;
	private String name;
	private long phone;
	private String desg;
	private String email;
	private String password;
	private double sal;
	
	
	
	public double getSal() {
		return sal;
	}
	public void setSal(double sal) {
		this.sal = sal;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getPhone() {
		return phone;
	}
	public void setPhone(long phone) {
		this.phone = phone;
	}
	public String getDesg() {
		return desg;
	}
	public void setDesg(String desg) {
		this.desg = desg;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "EmployeeConfig [id=" + id + ", name=" + name + ", phone=" + phone + ", desg=" + desg + ", email="
				+ email + ", password=" + password + ", sal=" + sal + "]";
	}
	

}

