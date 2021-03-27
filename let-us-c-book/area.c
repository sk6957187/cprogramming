#include <stdio.h>
int main ()
{
	int lenght, breath, rarea, perimeter;
	float carea, radius, circumference;
	printf("Enter the value of lenght breath radius\n");
    scanf ("%d%d%f", &lenght, &breath, &radius);
    rarea = lenght*breath;
    perimeter = 2*(lenght + breath);
    carea = 22.0/7*radius*radius;
    circumference = 2*22/7*radius;
    printf("Area of rectangle = %d\n",rarea );
    printf("perimeter of rectangle = %d\n", perimeter );
    printf("Area of cirle = %f\n",carea ); 
    printf("circumference of cirle = %f\n",circumference); 
}