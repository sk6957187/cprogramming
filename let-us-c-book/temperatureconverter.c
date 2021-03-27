#include<stdio.h>
int main()
{
	float f , c;
	printf("Enter the temperature in fahrenheight\n");
	scanf ("%f",&f);
	c=(f-32)*5/9;
	printf("temperature in centigrade %f\n", c);
	
}