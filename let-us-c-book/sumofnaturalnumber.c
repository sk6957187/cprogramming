#include <stdio.h>
int sum(int);
int main()
{
	int num,s;
	printf("Enter the number\n");
	scanf("%d",&num);
	s=sum(num);
	printf("Sum of first %d natural number : %d\n",num,s);
	return 0;
}

int sum(int n)
{
	int s=0;
	if(n>=1)
	{
		//i++;
		s = n+sum(n-1);
		printf("s: %d\n", s);
	}
	return (s);
}