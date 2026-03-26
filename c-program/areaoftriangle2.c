#include <stdio.h>
#include <math.h>
int main()
{
  float base, height, area;

  printf("Enter base, height of triangle\n");

  scanf("%f%f", &base, &height);
  area = 0.5 * base * height;

  printf("Area of the triangle = %.3f\n", area);  // printing upto three decimal places

  return 0;
}