package main;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Practice {

//	public static int minsum(int[] nums) { 
//		Arrays.sort(nums);
//        int ans = 0;
//        for (int i = 1; i < nums.length; i++) {
//            if (nums[i] <= nums[i - 1]) {
//                ans += nums[i - 1] - nums[i] + 1;
//                nums[i] = nums[i - 1] + 1;
//            }
//        }
//        int sum =0;
//        for(int i=0; i<nums.length; i++) {
//        	sum += nums[i];
//        }
//        return sum;
//	}
	
//	 public static long minSum(int N, List<Integer> A) {
//	        Collections.sort(A);
//	        long ans = 0;
//	        //int N=A.size();
//	        for (int i = 1; i < N; i++) {
//	            if (A.get(i) <= A.get(i - 1)) {
//	                ans += A.get(i - 1) - A.get(i) + 1;
//	                A.set(i, A.get(i - 1) + 1);
//	            }
//	        }
//
//	        long sum = 0;
//	        for (int i = 0; i < N; i++) {
//	            sum += A.get(i);
//	        }
//
//	        return sum;
//	    }
//	
//	public static void main(String[] args) {
//		// TODO Auto-generated method stub
//		Scanner sc = new Scanner(System.in);
//		int n = sc.nextInt();
//		List<Integer> arr = new ArrayList<>();
//		
//		for(int i=0; i<n; i++) {
//			arr.add(sc.nextInt());
//		}
//		int sum = minsum(arr);
//		System.out.println(sum);
//		
//	}
//
//	private static int minsum(List<Integer> arr) {
//		// TODO Auto-generated method stub
//		return 0;
//	}/
	
	public static int minDeletionsToPalindrome(String s) {
        int n = s.length();
        int[][] dp = new int[n][n];

        for (int length = 1; length <= n; length++) {
            for (int i = 0; i <= n - length; i++) {
                int j = i + length - 1;
                if (length == 1) {
                    dp[i][j] = 1;
                } else if (s.charAt(i) == s.charAt(j)) {
                    dp[i][j] = (length == 2) ? 2 : dp[i + 1][j - 1] + 2;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }

        return n - dp[0][n - 1];
    }

    // Main function to solve the problem
    public static int getAnswer(int N, int K, List<Integer> A, String S) {
        int result = 0;
        int index = 0;
        for (int length : A) {
            String substring = S.substring(index, index + length);
            result += minDeletionsToPalindrome(substring);
            index += length;
        }
        return result;
    }

    // Main method to read input and call solve method
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int N = sc.nextInt();
        int K = sc.nextInt();
        List<Integer> A = new ArrayList<>();
        for (int i = 0; i < K; i++) {
            A.add(sc.nextInt());
        }
        sc.nextLine(); // Consume the remaining newline
        String S = sc.nextLine();

        int result = getAnswer(N, K, A, S);
        System.out.println(result);

        sc.close();
    }

}
