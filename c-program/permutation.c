#include<stdio.h>  
int main()
{
	int k, n, r,l,m, Factorial,nPr;
	printf("Enter two  number\n");
	scanf("%d%d",&n,&r);
	k=factorial(n);
	l=factorial(n-r);
	printf("k=%d, l=%d, \n",k,l);
	nPr = k/l;
	printf(" %dc%d is: %d\n", n, (n-r),Factorial );
 }
 int factorial(int a)
 {
 	int i,factorial=1;
 	for(i=1; i<=a; i++)
 		factorial=factorial*i;
 	return(factorial);
 }	
  





