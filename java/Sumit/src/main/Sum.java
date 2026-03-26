package main;
import java.util.Scanner;

public class Sum {
    public static void main(String[] args)
    {
        int i,j,s;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter 1st number:");
        i = sc.nextInt();
        System.out.println("Enter 2st number:");
        j = sc.nextInt();
        s=i+j;
        System.out.println(s);
        sc.close();
    }
}