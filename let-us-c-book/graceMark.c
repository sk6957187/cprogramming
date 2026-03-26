#include <stdio.h>
#include <string.h>
int main()
{
	int i, sum,num_fail,j,fail;
	float avg,s;
	int optend_number[20];
	sum=0;
	i=0;
	j=1;
	num_fail=0;
	//fail=30;
	printf("Enter total number of sub.");
	scanf("%f",&s);
	printf("Enter the optend number\n");
	for (int i = 0; i < s; i++)
	{
		scanf("%d",&optend_number[i]);
	}
	for (int i = 0; i < s; i++)
    {
    	sum += optend_number[i];
    }
	avg=sum/s;
	if(avg>=60)
		for(i=0;i<s;i++)
		{
			fail=optend_number[i];
			if(30>fail)
			{	
				num_fail +=j;
			}

		}
		if(num_fail>0)
		{
			printf("%d subject failed and grace marks is %d \n",num_fail, 5*num_fail);
		}
		else
		{
			printf("All subject passed\n");
		}
}