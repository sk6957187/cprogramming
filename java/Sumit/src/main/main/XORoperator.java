package main;
public class XORoperator {
	public static int[] xorQueries(int[] arr, int[][] queries) {
        int res[] = new int[queries.length];
        int xor[] = new int[arr.length];
        xor[0] = arr[0];
        for(int i=1; i<arr.length; i++){
            xor[i] = xor[i-1] ^ arr[i];
            //System.out.println(xor[i]);
        } 
        System.out.println();
        for(int i=0; i<queries.length; i++){
            int left = queries[i][0];
            int right = queries[i][1];
            //int xors = 0;
//            for(int j=left; j<=right; j++){
//                xors = xors ^ arr[j];
//            }
//            res[i]=xors;
            if(left == 0) {
            	res[i] = xor[right];
            }else {
            	res[i] = xor[right] ^ xor[left-1];
            }
            
        }
        return res;
    }
	public static void main(String[] args) {
		int[] arr = {1,3,4,8};
		int[][] queries = {{0,1},{1,2},{0,3},{3,3}};
		int [] result = xorQueries(arr, queries);
		for(int p:result) {
			System.out.print(p+" ");
		}		
	}
}
/*
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8] 
Explanation: 
The binary representation of the elements in the array are:
1 = 0001 
3 = 0011 
4 = 0100 
8 = 1000 
The XOR values for queries are:
[0,1] = 1 xor 3 = 2 
[1,2] = 3 xor 4 = 7 
[0,3] = 1 xor 3 xor 4 xor 8 = 14 
[3,3] = 8
*/