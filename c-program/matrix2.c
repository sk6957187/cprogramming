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
    int i, j, A[size][size],resl,p,q;
    p=1;
    q=1;
    printf("Enter matrix input (%dx%d) B\n", size, size);
    inputMarix(A);

    printf("Matrix A:\n");
    printMatrix(A);
    //resl = A[0][0]*A[1][1] - A[0][1]*A[1][0];
    for ( i = 0; i < size; i++){
        for ( j = 0; j < size; j++){
            if (i==j) {
                p=p*A[i][j];
            }
            else {
                q=q*A[i][j];
            }
        }
    }
    resl = p - q;
    printf("result = %d\n", resl);
 }