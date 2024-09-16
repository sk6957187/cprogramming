#include <stdio.h>
int main ()
{
	int A,B,C, D, E, sum;
	float result;
	printf("Enter the optend numbers \n");
    scanf("%d%d%d%d%d",&A, &B, &C, &D, &E);
    sum = A+B+C+D+E;
    result = sum * 100.0 / 500;
    printf("total marks optend: %d\n", sum);
    printf("marks in percent: %f\n", result);
    return 0;
}