//greaternumber.c
#include <stdio.h>
int main()
{
	int a,b,n,num,large;
	large =0;
	printf("How many numbers\n");
	scanf("%d", &n);
	for (int i = 0; i < n; i++)
	{
		printf("Enter the number %d\n",i+1);
		scanf("%d",&num);
		if(num>large)
			large=num;
	}
	printf("\nLargest number is %d\n", large );
}