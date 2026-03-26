#include<stdio.h>
int factorial(int);
int main()
{
	int n, r, ncr;
	int t1,t2,t3;
	 printf("enter the two number\n");
     scanf("%d%d",&n,&r);
     t1=factorial(n);
     t2=factorial(r);
     t3=factorial(n-r);
     printf("t1=%d, t2=%d, t3=%d\n",  t1, t2, t3);
     ncr=t1/(t2*t3);
     //ncr=factorial(n)/(factorial(r)*factorial(n-r));
     printf("value is %d\n",ncr );
     
}
int factorial(int A)
{
	int i,factorial=1;
	for (i=1; i<=A; i++)
		factorial = factorial*i;
	return(factorial);
}



