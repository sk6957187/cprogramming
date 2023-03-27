#include <stdio.h>
int main ()
{
	int i, num, j;
	i=1;
	printf("Enter the number\n");
	scanf("%d",&num);
	while(i<=10)
	{
		j=i*num;
		printf("%d*%d = %d\n",num,i,j );
		i++;
	}
	return 0;
}
