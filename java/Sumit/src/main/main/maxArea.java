package main;

import java.util.Scanner;

public class maxArea {

	public static int maxArea(int[] height) {
        int max=0;
        // for(int i=0; i<height.length-1; i++){
        //     int area=0;
        //     for(int j=i+1; j<height.length; j++){
        //         if(height[i]>height[j]) {
        //             area=height[j]*(j-i);
        //         }
        //         else{
        //             area = height[i]*(j-i);
        //         }
        //         if(max < area){
        //             max=area;
        //         }
        //     }
        // }
        // return max;
        
        int l = 0;
        int r = height.length -1;
        int area = 0;
     
        while (l < r)
        {
            // Calculating the max area
            area = Math.max(area, 
                        Math.min(height[l], height[r]) * (r - l));
                         
            if (height[l] < height[r])
                l += 1;
                 
            else
                r -= 1;
        }
        return area;

    }
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		int len = sc.nextInt();
		int[] height = new int[len];
		for(int i=0; i<len; i++) {
			height[i]=sc.nextInt();
		}
		System.out.println("Max area filled by water: "+maxArea(height));
		sc.close();
		// len=9
//		height = [1,8,6,2,5,4,8,3,7],     
//		Output: 49
	}

}
