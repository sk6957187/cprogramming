package oopsEx;

import java.util.ArrayList;

import servies.Servies;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ArrayList<String> book = new ArrayList<>();
		Servies servies = new Servies();
		book= servies.update();
		System.out.println(book);
	}

	

}
