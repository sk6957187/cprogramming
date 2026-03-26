package java8;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public class Array {
	public static void main(String[] args) {
		int[] arr = {5, 2, 2, 8, 1, 5, 3};

		Map<Integer, Long> countMap =
		        Arrays.stream(arr)
		              .boxed()
		              .collect(Collectors.groupingBy(
		                      n -> n, Collectors.counting()));

		System.out.println(countMap);
		
		Arrays.stream(arr)
        .sorted()
        .distinct()
        .skip(1)         
        .forEach(System.out::println);
		
	}

}
