package main;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private long phone;
	private String name;
	
	@JoinColumn
	@OneToOne
	private AadharCard card;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public long getPhone() {
		return phone;
	}

	public void setPhone(long phone) {
		this.phone = phone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public AadharCard getCard() {
		return card;
	}

	public void setCard(AadharCard card) {
		this.card = card;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", phone=" + phone + ", name=" + name + "]";
	}
	
	
}
