package dsa;

import java.util.HashMap;
import java.util.Set;

public class Hashmaps {
	static void hmap(int[] arr) {
		HashMap<Integer, Integer> hm = new HashMap<>();
		for (int element : arr) {
			hm.put(element, hm.getOrDefault(element, 0)+1);
		}
		Set<Integer> keys = hm.keySet();
		for(int key : keys) {
			System.out.println(key + "->"+hm.get(key));
		}
	}
	public static void main(String[] args) {
		int arr[] = {1,2,3,4,3,2,1,5};
		hmap(arr);
	}
}
