#include<stdio.h>

int main()
{
   int a[3] = {1, 2, 3};
   int *p = a;    
   for (int i = 0; i < 3; i++)
   {
      printf("%d \n", *p);
      p++;
   }
  return (0);
}
  