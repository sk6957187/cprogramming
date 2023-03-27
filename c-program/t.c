#include<stdio.h>

int main()
{
  int i;
  do{
    printf("I=");
    scanf("%d",&i);
    printf("A=%d\t",i);
    i++;
  } while (i != 3);
}