package main;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class AadharCard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private long number;
	private String address;
	
	@OneToOne(mappedBy="card")
	private Users users;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public long getNumber() {
		return number;
	}

	public void setNumber(long number) {
		this.number = number;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Users getUser() {
		return users;
	}

	public void setUser(Users user) {
		this.users = user;
	}

	@Override
	public String toString() {
		return "AadharCard [id=" + id + ", number=" + number + ", address=" + address + "]";
	}
	
	
	
}
