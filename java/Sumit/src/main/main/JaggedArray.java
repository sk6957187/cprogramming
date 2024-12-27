package main;

import java.util.Scanner;

public class JaggedArray {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int m,n;
        int[][] arr;
        System.out.println("Enter number of row in matrix:");
        m=sc.nextInt();
        arr = new int[m][];
        for(int i=0; i<m; i++){
            System.out.println("Enter no. of colum in "+(i+1)+" matrix:");
            n=sc.nextInt();
            arr[i] = new int[n];
        }
        for(int i=0; i<m; i++){
            System.out.println("Enter element of "+(i+1)+"row:");
            for(int j=0; j<arr[i].length; j++){
                arr[i][j] = sc.nextInt();
            }
        }
        System.out.println("Matrix:-");
        for(int i=0; i<m; i++){
            for(int j=0; j<arr[i].length; j++){
                System.out.print(arr[i][j]+" ");
            }
            System.out.println("");
        }
        sc.close();
    }
}
