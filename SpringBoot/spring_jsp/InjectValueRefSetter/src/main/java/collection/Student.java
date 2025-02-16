package collection;

import java.util.List;

public class Student {
	int id;
	String name;
	List<String> teacher;
	public Student(int id, String name, List<String> teacher) {
		super();
		this.id = id;
		this.name = name;
		this.teacher = teacher;
	}
	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", teacher=" + teacher + "]";
	}
	
}
