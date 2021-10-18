#include <stdio.h>

int main()
{
	int i,j,k,n, temp;
	int num[50];
	printf("How many numbers you are enter:\n");
	scanf("%d", &n);
	printf("Enter the number:\n");
	for(i=0; i<n; i++)
	{
		scanf("%d",&num[i]); 	
	}
	for(j=0; j<n; j++)
	{
		for(k=j+1; k<n; k++)
		{
			if (num[j] > num[k])
			{
				temp=num[j];
				num[j]=num[k];
				num[k]=temp;
			}
		}
	}
	printf("Numbers in increasing order:\n");
	for (i = 0; i < n; ++i)
    	printf("%d\t", num[i]);
}