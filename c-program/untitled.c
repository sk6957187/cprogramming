#include<conio.h>
#include<stdio.h>
int main()
{
	int k, n, r,l,m, Factorial;
	printf("Enter the number\n");
	scanf("%d",&n);
	k=factorialofN(n);
    
	printf("Factorial of %d  is: %d\n", n, k);
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
  
