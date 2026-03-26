package main;

import javax.persistence.*;
import javax.persistence.GeneratedValue;

@Entity
@Table(name="user")
public class Marchent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;
	
	@Column(name = "NAME", nullable = false)
    private String name;
    private long phone;
    private String email;
    private String password;
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
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
		return "Marchent [Id=" + Id + ", name=" + name + ", phone=" + phone + ", email=" + email + ", password="
				+ password + "]";
	}
	
}
