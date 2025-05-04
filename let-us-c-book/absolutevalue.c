#include <stdio.h>
int main()
{
	int no,a;
	float No;
	printf("for real number type 1\n");
	printf("for integer number type 2\n");
	scanf("%d",&a);

    
	if (a==1)
	{	
		printf("Enter any real  number\n");
	    scanf("%f",&No);
	    if(No<0)
	{
		no = no* -1;
		printf("The absolute value of given number is %f \n", No );

	}
	else
	{
		printf("The absolute value of given number is %f \n",No);
	}
    }
    if(a==2)
    {	
	printf("Enter any  integer	 number\n");
	scanf("%d",&no);
	if (no<0)
	{
		no = no* -1;
		printf("The absolute value of given number is %d\n", no );

	}
	else
	{
		printf("The absolute value of given number is %d\n",no );
	}
    }
}