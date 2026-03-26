package main;

import java.util.PriorityQueue;
import java.util.Scanner;

public class priorityQueue {
	public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Number of wire:- ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Cost for wire:-");
        for(int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int total = adding(arr, n);
        System.out.println("Minumum cost of wire is:- "+total);
        sc.close();
    }

    private static int adding(int[] arr, int n) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for(int a : arr) {
            minHeap.add(a);
        }
        int cost = 0;
        while(minHeap.size() > 1) {
            // Extract the two smallest wires
            int wire1 = minHeap.poll();
            int wire2 = minHeap.poll();
            // Combine them into a single wire
            int combined = wire1 + wire2;
            // Add the combined wire to the cost
            cost += combined;
            // Add the combined wire back to the queue
            minHeap.add(combined);
        }
        return cost;
    }
}
