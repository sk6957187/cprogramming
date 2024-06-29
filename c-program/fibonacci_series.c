#include <stdio.h>

void fib(int n)
{
	static int n1=0,n2=1,n3;
	//n1=0;
	//n2=1;
	if(n>0) {
		n3=n1+n2;
		n1=n2;
		n2=n3;
		printf("%d ",n3);
		fib(n-1);
	}

}
int main()
{
	int n;
	printf("Enter the number: ");
	scanf("%d",&n);
	printf("Fibbonacci series is :");
	printf(" 0 1 ");
	fib(n-2);
	printf("\n");

}