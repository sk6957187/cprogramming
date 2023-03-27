/* C program for Merge Sort */
#include <stdio.h>
#include <stdlib.h>
//#include <conio.h>


void merge(int A[], int lb, int m, int ub)
{
        int i, j, k;
        int n1 = m - lb + 1;
        int n2 = ub - m;

        int L[n1], R[n2];

        for (i = 0; i < n1; i++)
                L[i] = A[lb + i];
        for (j = 0; j < n2; j++)
                R[j] = A[m + 1 + j];

        i = 0;
        j = 0;
        k = lb;
        while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                        A[k] = L[i];
                        i++;
                }
                else {
                        A[k] = R[j];
                        j++;
                }
                k++;
        }

        while (i < n1)
        {
                A[k] = L[i];
                i++;
                k++;
        }

        while (j < n2)
        {
                A[k] = R[j];
                j++;
                k++;
        }
}

void mergeSort(int A[], int lb, int ub)
{
        if (lb < ub)
        {
                int m = lb + (ub - lb) / 2;

                mergeSort(A, lb, m);
                mergeSort(A, m + 1, ub);
               
                merge(A, lb, m, ub);
        }
}


int main()
{
        int n;
        printf("Enter the number of elements to be sort: \n");
        scanf("%d", &n);
        int A[n] , i;
        printf("Enter the integer elements: \n");
        for (i = 0; i < n; i++)
        {
                scanf("%d", &A[i]);
        }        
       
        printf("\n The given array is:\t");

        for (i = 0; i < n; i++)
                printf("%d\t", A[i]);
       

        mergeSort(A, 0, n-1);

        printf("\n\n The sorted array is:\t");
       
        for (i = 0; i < n; i++)
                printf("%d\t", A[i]);
        printf("\n");
       
        //getch();
        return 0;
}