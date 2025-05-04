package main;

public class MaxSum {

	public static void main(String[] args) {
		int[] a= {1,3,5,7,5,3,2,4,3};
		int[] b= {2,3,7,6,4,2,1,2,3};      //where same number then your choice is line change or not 
		int res=maxSum(a,b);
		System.out.println(res);
	}

	private static int maxSum(int[] a, int[] b) {
		int l1=a.length;
		int l2=b.length;
		int sum1=0, sum2=0, sum=0;
		int i=0,j=0;
		while(l1>i && l2>j) {
			if(a[i]==b[j]) {
				if(sum1 >= sum2) {
					sum +=sum1 +a[i];
				}else {
					sum +=sum2+a[i];
				}
				sum1=0;
				sum2=0;
				i++;
				j++;
				//System.out.print(sum+" ");
			}else if(a[i]>b[j]) {
				sum2 += b[j];
				j++;
			}else {
				sum1 +=a[i];
				i++;
			}
		}
		while(l1>i) {
			sum1 += a[i];
			i++;
		}
		while(l2>j) {
			sum2 +=b[j];
			j++;
		}
		if(sum1 >= sum2) {
			sum +=sum1;
		}else {
			sum +=sum2;
		}
		
		return sum;
	}

}
