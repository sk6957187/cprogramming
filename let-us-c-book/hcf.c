#include <stdio.h>

void hcf(int a, int b, int *c)
{
	int temp;
	if(a> b)
	{
		*c = a / b;
		temp = a - b * *c;
	}
	else
	{
		*c = b / a ;
		temp = b - a * *c;
	}
	while(*d !=1 && *b !=1)
	{
		if(*d > *b)
		{
			*c = *d / *b;
			*d = *d- *b * *c;
		}
		else
		{
			*c = *b / *d;
			*d = *b - *d * *c;
		}
	}

}

int main()
{
	int a,b,n,c,d;
	printf("Enter the two number:\n");
	scanf("%d %d", &a,&b);
	hcf(&a, &b, &c, &d);
	if(c>d)
	{
		printf("%d\n",d);
	}
	if(d<c){
		printf("%d\n", c);
	}
}