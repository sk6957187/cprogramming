#include <stdio.h>
int main()
{
	int A, B, C, size, n;
	n = 0;
	scanf("%d",&size);
	for (int i = 0; i < size; ++i)
	{
		scanf("%d %d %d",&A, &B, &C);
		if ( (A==1 && B==1) || (A==1 && C==1) || (B==1 && C==1) || (A==1 && B==1 && C==1) )
		{
			n = n+1;
		}
	}
	printf("%d\n",n );
}