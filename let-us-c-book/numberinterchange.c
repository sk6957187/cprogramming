#include<stdio.h>
int main()
{
	int A,B,a,b;
	printf("Enter the two value A & B\n");
	scanf("%d %d",&A,&B);
	A = A+B;  //out put A=A+B
	B = A-B;  //out put B=(A+B)-B
	A = A-B;  //out put A=(A+B)-((A+B)-B)
	printf("A:%d and B:%d\n",A,B );
}