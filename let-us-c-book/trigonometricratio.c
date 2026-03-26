#include<stdio.h>
#include <math.h>
int main()
{
	float s,c,t,angle;
	printf("Enter an angle\n");
	scanf ("%f",&angle);
	//convert angle to radians
	angle=angle*3.14/180;
	s=sin(angle);
	c=cos(angle);
	t=tan(angle);
	printf("sin=%f\n cos=%f\n tan=%f\n",s,c,t );
    return 0;

}