package java8;

import java.util.*;
import java.util.stream.Collectors;

public class HashMapFilterByKey {
	public static void main(String[] args) {
		Map<Integer, Integer> mp = new HashMap<>();
        mp.put(1,2);
        mp.put(2,3);
        mp.put(5,6);

        Map<Integer, Integer> res = mp.entrySet().stream()
            .filter(e -> e.getKey()%2 != 0)
			.collect(Collectors.toMap(
					Map.Entry::getKey,
					Map.Entry::getValue
					));
		System.out.println(res);
	}
}
