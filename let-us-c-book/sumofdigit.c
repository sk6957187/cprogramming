#include<stdio.h>
int main()
{
	int a,d1,d2,d3,d4,d5,sum;
	printf("Enter the five digit number (less than 32767)\n");
    scanf("%d",&a);
    d1=a%10;
    a=a/10;
    d2=a%10;
    a=a/10;
    d3=a%10;
    a=a/10;
    d4=a%10;
    a=a/10;
    d5=a%10;
    sum = d1+d2+d3+d4+d5;
    printf("sum = %d\n",sum );
    return 0;
}