package jspDEmo;

import javax.persistence.*;
import javax.persistence.GeneratedValue;

@Entity
@Table()
public class Marchent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY);
	private int Id;
	
}
