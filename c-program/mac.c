#include <stdio.h>
int main()
{
	int i, j, A[3][3], B[3][3];
	printf("enter the matrix in 3*3\n");
	for (int i = 0; i < 3; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			scanf("%d\n", &A[i][j]);
		}
	}
	printf("input matrix A\n");
	for (int i = 0; i < 3; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			printf("%d \t", A[i][j] );
		}
	printf("\n");	
	}
	return 0;
}