#include <stdio.h>

int getarray(int *a)
{
	printf("Enter the element ia an array:\n");
	for (int i = 0; i < 5; i++)
	{
		scanf("%d",&a[i]);
	}
	return *a;
}

int main()
{
	int *n;
	int a[5];
	*n=getarray(a);
	printf("Element of array are :");
	for (int i = 0; i < 5; i++)
	{
		printf("%d\n",n[i] );
	}
	return 0;
}