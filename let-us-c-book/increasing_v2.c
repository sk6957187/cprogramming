#include <stdio.h>

int main()
{
	int i,j,k,n,temp,lenght;
	int num[50];
	printf("How many numbers you want to enter:\n");
	scanf("%d", &n);
	lenght=0;
	for(i=0; i<n; i++)
	{
		printf("Enter the number:\n");
		scanf("%d",&temp);
		for ( j = lenght-1; j >=0; j--)
		{
			if (num[j]>temp)
			{
				num[j+1]=num[j];
				continue;

			}
			break;
		}
		num[j+1]=temp;
		lenght++;
		printf("Numbers in increasing order:\n");

		for ( k = 0; k < lenght; k++)
		{
			printf("%d\t",num[k]);

		}
		printf("\n");
	}
	return 0;
}