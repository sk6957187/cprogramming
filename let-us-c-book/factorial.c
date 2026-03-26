#include <stdio.h>
int main()
{
	int i, number, factorial;
	factorial=1;
	printf("Enter number\n");
	scanf("%d", &number);
	for (i = 1; i <=number; i++)
	{
		factorial=factorial*i;
	}
	printf("%d factorial is %d\n",number,factorial );
}