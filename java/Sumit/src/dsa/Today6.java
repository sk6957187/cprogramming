package dsa;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Scanner;
import java.util.Set;
import java.util.Stack;
import java.util.stream.Collector;
import java.util.stream.Collectors;


public class Today6{
	
		
	public static void main(String[] args) {
		List<Integer> list = new ArrayList<>(List.of(1,2,3,4));
		int[] arr = {1,2,5,7,8};
		list.add(10);
		list.addAll(Arrays.stream(arr)
				.boxed()
				.toList());
		
		
		System.out.println(list);
		System.out.println();
		
		Integer sum = list.stream()
						.mapToInt(Integer::intValue)
						.sum();
				
		
	}
}
