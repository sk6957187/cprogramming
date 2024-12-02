package main;

import java.util.Scanner;

public class SumOfTwoString {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the first number: ");
        String str1 = sc.next();
        System.out.print("Enter the second number: ");
        String str2 = sc.next();
        sc.close();
        int len = Math.max(str1.length(), str2.length());
        int[] arr1 = new int[len];
        int[] arr2 = new int[len];
        int[] arr3 = new int[len + 1];
        for (int i = 0; i < str1.length(); i++) {
            arr1[len - str1.length() + i] = str1.charAt(i) - '0';
        }
        for (int i = 0; i < str2.length(); i++) {
            arr2[len - str2.length() + i] = str2.charAt(i) - '0';
        }

        int carry = 0;
        for (int i = len; i > 0; i--) {
            int sum = arr1[i - 1] + arr2[i - 1] + carry;
            arr3[i] = sum % 10;
            carry = sum / 10;
        }
        if (carry > 0) {
            arr3[0] = carry;
        }

        System.out.print("Sum = ");
        if (arr3[0] != 0) {
            System.out.print(arr3[0]);
        }
        for (int i = 1; i < len + 1; i++) {
            System.out.print(arr3[i]);
        }
        System.out.println();
    }
}
