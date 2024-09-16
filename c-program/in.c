#include <stdio.h>
void main()
{
	int x=4, *j,a;
	j=&x;
	a=3;
	a=sum();
	printf("%d %u\n",x,1+1);
	printf("%d %u\n", *j, &x);
	printf("%d %u\n",*j,&x );
    printf("%u\n", &j);
    printf("Sum = %d\n",a);
}
void sum(){
	int a=2, b=3;
	int s;
	s=a+b;

}
