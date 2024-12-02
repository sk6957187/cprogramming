#include <stdio.h>

int factors(int number)
{
	int i,y;
	i=2;
	printf("Prime factors of %d is \n",number );
	while(number !=1)
	{
		if(number%i==0)
		{
			printf("%d\n", i);
		}
		else
		{
			i++;
			continue;
		}
		number=number/i;
	}
	return 0;
}
 int main()
{
	int number,fact;
	printf("Enter the number\n");
	scanf("%d",&number);
	fact=factors(number);

}