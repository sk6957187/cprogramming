package main;

public class MountainValley {
	
	static boolean checkMontvaly(int[] arr) {
		if (arr.length < 2 || arr[0] == arr[1]) {
		    return false;
		}
		boolean mount = arr[1] < arr[0];
		
		for(int i=1 ;i<arr.length; i++) {
			if(mount && (arr[i] >= arr[i-1])) {
				return false;
			} else if(!mount && arr[i] <= arr[i-1] ) {
				return false;
			}
				mount = !mount;
			
		}
		return true;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] arr = {1,5,2,3,1,2,1};
		System.out.println(checkMontvaly(arr));
		int[] arr1 = {1, 5, 2, 3, 4, 1, 2, 1}; // false
        int[] arr2 = {5, 2, 4, 1, 3,3};       // false
        int[] arr3 = {1, 3, 2, 4, 3};       // true
        int[] arr4 = {1, 1, 2};            // false (equal values)

        System.out.println(checkMontvaly(arr1)); // false
        System.out.println(checkMontvaly(arr2)); // true
        System.out.println(checkMontvaly(arr3)); // true
        System.out.println(checkMontvaly(arr4));

	}

}
