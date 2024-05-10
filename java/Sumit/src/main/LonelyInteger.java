package main;

import java.util.*;


public class LonelyInteger {
    public static void main(String[] args){
    	Scanner sc = new Scanner(System.in);
    	System.out.println("Enter no. of element in array");
        int n = Integer.parseInt(sc.next());
        sc.nextLine();
        System.out.println("Enter element ");
        
        System.out.println("11111");
        String[] aTemp = sc.nextLine().split(" ");
        List<Integer> a = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            int aItem = Integer.parseInt(aTemp[i]);
            a.add(aItem);
        }

        int result = lonelyinteger(a);

        System.out.println(result);
        sc.close();
    }
    
    public static int lonelyinteger(List<Integer> a) {
        int temp=0;
        int l=a.size();
        for(int i=0; i<l; i++){
            for(int j=0; j<l; j++){
                if(i != j){
                    if(a.get(i).equals(a.get(j))){
                        break;
                    }
                    //result ^= num;
                }
                if(j==l-1){
                    temp=a.get(i);
                }
            }
        }
        return temp;

        }
}
