package dsa;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

public class printNmaxRepeated {
	public static void main(String[] args) {
		String[] arr = {"ab", "ab", "bc", "bc", "cd", "ab" };
		int n = 2;
		
		HashMap<String, Integer> map = new HashMap<>();
		for(String a: arr) {
			map.put(a, map.getOrDefault(a, 0)+1);
		}

		List<Integer> value = new ArrayList<>(map.values());
		value.sort((a,b) -> b-a);
		Set<Integer> requredVaue = new HashSet<>();
		
		{
			int i = 0;
			for(Integer v: value) {
				requredVaue.add(v);
				i++;
				if(i == n) {
					break;
				}
			}
			System.out.println(i);
		}
		
		for(Entry<String, Integer> entity: map.entrySet()) {
			if(requredVaue.contains(entity.getValue()))
				System.out.println(entity.getKey() +" "+ entity.getValue());
		}
	}
}
