#include<stdio.h>  
#include <math.h>
#include <conio.h>
 main()
{
	int k, n, r,l,m, Factorial;
	printf("Enter the number\n");
	scanf("%d%d",&n,&r);
	k=factorialofN(n);
    l=factorialofR(r);
	m=factorialofnr(n,r);
	Factorial = k/(l*m);
	printf("Factorial of %d and %d is: %d\n", n, r,Factorial );
  return;
 }

  int factorialofN(inta)
  {
  	int a, factorial;
   for(a=1; a<=inta; a++)
   {
   	factorial = factorial * a;
   	return (factorial);
   }
  }
  int factorialofR(intb)
{
  	int b,factorial;
    for(b=1; b<=intb; b++)
    {
    	factorial= factorial*b;
    	return(factorial);
    }
  }

  int factorialofnr(intc, intd) 
  {
  	int Z, factorial;
  	for( Z=1; Z<=(intc-intd); Z++)
  		factorial=factorial*Z;
  	return(factorial);
  }










