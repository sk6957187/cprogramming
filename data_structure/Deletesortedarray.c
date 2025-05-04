#include <stdio.h>
int main()
{
	int array[100], element, i, n, pos;
	int found=0;
	printf("Enter number of element in array\n");
	scanf("%d",&n);
	printf("Enter %d element\n", n);
	for(i=0;i<n;i++)
	{
		scanf("%d",&array[i]);
	}
	printf("the input array is:\n");
	for(i=0;i<n;i++)
	{
		printf("%d \n",array[i] );
	}
	printf("Enter the elementto be deleted\n");
	scanf("%d",&element);
	for (int i = 0; i < n; ++i)
	{
		if (array[i]==element)
		{
			found=1;
			pos=i;
			break;
		}
	}
	if(found==1)
	{
		for(i=pos;i<n-1;i++)
		{
			array[i]=array[i+1];
		}
	}
	else
	{
		printf("Element is not found in the array\n");
	}
	printf("Resultant array is:\n");
	for (int i = 0; i < n-1; ++i)
	{
		printf("%d\n",array[i] );
	}
	return 0;
}