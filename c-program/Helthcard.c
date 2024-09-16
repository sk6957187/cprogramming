#include <stdio.h>
#include <math.h>
int main ()
{
	float weight, lenght, BMI;
	printf("Enter the weight\n");
	scanf("%f",&weight);
	printf("Enter the lenght\n");
	scanf("%f",&len)
	BMI = weight/pow(len,2);
	if (BMI <= 15)
	{
		printf("Body mass index is %f \n",BMI );
		printf("Starvation\n");
	}
	else if (BMI >15 && BMI <= 17.5)
	{
		printf("Body mass index is %f \n",BMI );
		printf("Anorexi\n");
	}
	else if (BMI > 17.5 && BMI <= 18.5)
	{
		printf("Body mass index is %f \n",BMI );
		printf("Underweight\n");
	}
	else if (BMI > 18.6 && BMI <= 24.9)
	{
		printf("Body mass index is %f \n",BMI );		
		printf("Ideal\n");
	}
	else if (BMI > 24.9 && BMI <= 25.9)
	{
		printf("Body mass index is %f \n",BMI );
		printf("Overweghit\n");
	}
	else if (BMI > 25.9 && BMI <= 39.9)
	{
		printf("Body mass index is %f \n",BMI );
		printf("Obeser\n");
	}
	else if (BMI > 39.9)
	{
		printf("Body mass index is %f \n",BMI );
		printf("Morbidly Obeser\n");
	}
	else{
		printf("Re-entery\n");
	}
}