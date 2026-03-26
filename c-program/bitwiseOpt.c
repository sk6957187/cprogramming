#include<stdio.h>
#include <math.h>

int main()
{
	int n,k;
	int and=0, or=0, xor=0;
	printf("Enter the value of n, k: ");
	scanf("%d %d",&n, &k);
	for(int i =0; i<=n; i++) {
		for(int j = i+1; j<=n; j++) {
			if((i&j)>and && (i&j)<k)
				and = i&j;
			if ((i|j)>or && (i|j)<k)
				or = i|j;
			if((i^j)>xor && (i^j)<k)
				xor = i^j;
		}
	}
	// and = n&k;
	// or = n|k;
	// xor = n^k;

	printf("And = %d, Or = %d, xor = %d", and,or,xor);
	return 0;
}