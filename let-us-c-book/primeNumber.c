#include<stdio.h>
int main()
{
	int i,j;
	int number;
	i=1;
	printf("Enter number \n");
	scanf("%d", &number);
	for(i=1;i<=number;i++)
	{
		j=2;
		for(j=2;j<i;j++)
		{
			if (i%j==0)
			{
				break;
			}
		}
		//mohan
	
		if (j==i)
		{
			printf("%d\n", i);
		}
	}
	return 0;
}