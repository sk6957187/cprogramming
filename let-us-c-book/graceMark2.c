#include <stdio.h>
int main()
{
	int c,sub;
	printf("Enter the calss and num of subject failed\n");
	scanf("%d %d",&c, &sub);
	switch(c)
	{
	case 1:
		if(sub<=3)
		{
			printf("student get total number of grace is %d\n", 5*sub);
		}
		else
		{
			printf("No grace marks\n");
		}
		break;
	case 2:
		if(sub<=2)
		{
			printf("student get total number of grace is %d\n", 4*sub);
		}
		else
		{
			printf("No grace marks\n");
		}
		break;
	case 3:
		if(sub==1)
		{
			printf("student get total number of grace is %d\n", 5*sub);
		}
		else
		{
			printf("No grace marks\n");
		}
		break;
	default:
		printf("Wrong class intered\n");

	}
}