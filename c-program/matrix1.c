#include <stdio.h>
int size = 2;
void printMatrix(int A[size][size]) {
    int j;
    for (int i = 0; i < size; i++){
        for (j = 0; j < size; j++){
            printf(" %d", A[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}
void inputMarix(int  A[size][size]) {
    int i,j;
    for(i=0; i<size; i++) {
        for (j = 0; j <size; j++)
        {
            scanf("%d", &A[i][j]);  
        }
    }
    printf("\n");
}
int main()
{
    int i, j, C[size][size], A[size][size], B[size][size];
    printf("Enter matrix input (%dx%d) B\n", size, size);
    inputMarix(A);
    printf("Enter matrix input (%dx%d) B\n", size, size);
    inputMarix(B);

    printf("Matrix A:\n");
    printMatrix(A);
    printf("Matrix B:\n");
    printMatrix(B);
    for(i=0; i<size; i++) {
        for (j=0; j<size; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
    printf("Matrix C:\n");
    printMatrix(C);
}