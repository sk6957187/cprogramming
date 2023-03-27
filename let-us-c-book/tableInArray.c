#include<stdio.h>

int table(int n, int num[])
{
	//int num[i];
	//table = 0;
	//int num;
	for (int i = 0; i < 10; i++)
	{
		num[i]=n*(i+1);
		printf("A%d * %d = %d\n",n,i+1,num[i] );
	}
}

int main()
{
	int n,i; 
	int num[i];
	printf("Enter the table number\n");
	scanf("%d",&n);
	num[i]=table(n,&num);
	for (int i = 0; i < 10; i++)
	//Error, I NOT KNOW WHY THIS PART IS NOT RUNNING
	//I WANT PROGRAM END IN THIS POINT
	{
		printf("%d * %d = %d\n", n, i+1, num[i]);
	}
	
	return 0;
}
