#include <stdio.h>
#include <math.h>
int main()
{
  float radius, perimeter;

  printf("Enter the radius of a circle\n");

  scanf("%f", &radius);
  perimeter = 3.14159*2*radius;

  printf("perimeter of the circle = %.3f\n", perimeter);  // printing upto two decimal places

  return 0;
}