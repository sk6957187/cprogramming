package DSA;

/*Given a binary array nums and an integer k, return the maximum number of consecutive 1's
 *  in the array if you can flip at most k 0's.
 * */

public class MaxCounscutiveOnes {
	    public static int longestOnes(int[] nums, int k) {
	        int longL = 0;
	        for(int i=0; i<nums.length; i++){
	        	int count0=0;
	            int temp =0;
	            for(int j=i; j<nums.length; j++){
	                if(nums[j]==0){
	                    count0++;
	                }
	                if(count0<=k) {
	                	longL = Math.max(longL, (j-i+1));
	                }
	            }
	            
	        }
	        return longL;
	    }
	
	public static void main(String[] args) {
		int[] nums = {0,0,1,1};
		int k = 1;
		int res = longestOnes(nums, k);
		System.out.println(res);
	}
}
