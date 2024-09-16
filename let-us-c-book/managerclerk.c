#include<stdio.h>
int main()
{
	float sal;
	char position, Manger, Clerk, Accountant;
	printf("Enter the salary\n");
	scanf("%f",&sal);
	position = (sal >=25000 && sal<=40000 ? printf("Manger\n") : (sal >= 15000 && sal <25000 ? printf("Accountant\n") : printf("Clerk\n")));
	return 0;
}