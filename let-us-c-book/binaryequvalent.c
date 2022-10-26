#include <stdio.h>
int binary(int);

int main()
{
	int num;
	printf("Enter the number\n");
	scanf("%d",&num);
	binary(num); 
	return 0;
}

int binary(int n)
{
	int r;
	r=n%2;
	n=n/2;
	if(n==0)
	{
		printf("The binary equivalent is: %d\t",r );
		return(r);
	}
	else
		binary(n);
	
	printf("%d\t", r);
}