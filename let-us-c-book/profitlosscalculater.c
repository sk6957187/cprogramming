/* profit or loss calculater */
#include <stdio.h>
int main()
{
	float cp, sp, p, l;
	printf("\nEnter cost price and selling prise");
	scanf("%f %f", &cp, &sp);
	p=sp-cp;
	//l=cp-sp;
	if(p>0)
		printf("seller made profit %f\n", p );
	if(p<0)
	//if(l>0)
		printf("seller made loss %f\n", -p);
	//if (p==0)
	else
		printf("there are no profit or no loss\n");
	return 0;
}