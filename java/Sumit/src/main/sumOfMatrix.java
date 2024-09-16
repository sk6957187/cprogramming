package main;

import java.util.Scanner;

public class sumOfMatrix {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the square matrix row:");
        int m = sc.nextInt();
        int[][] arr = new int[m][m];
        System.out.println("Enter the element of "+m+"X"+m+" matrix:-");
        for(int i=0; i<arr.length; i++){
            for (int j=0; j< arr.length; j++){
                arr[i][j] = sc.nextInt();
            }
        }
        System.out.println(m+"x"+m+"Matrix is:");
        for(int i=0; i<arr.length; i++){
            for (int j=0; j< arr.length; j++){
                System.out.print(arr[i][j] +" ");
            }
            System.out.println("");
        }
        int ps=0;
        int ss=0;
        for (int i=0; i<arr.length; i++){
            ps = ps+arr[i][i];
            ss = ss+arr[i][arr.length-i-1];
        }
        System.out.println("Primary diagonal: "+ps);
        System.out.println("Secondary diagonal: "+ss);

    }
}
