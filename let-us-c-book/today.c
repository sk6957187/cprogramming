
#include<stdio.h>
#include <stdlib.h>
int **read() {
    int i,j;
    int **mat[3][3];
    for(i=0; i<3; i++) {
        for(j=0; j<3; j++)  {
            printf("Enter the element[%d][%d]:-\n",i+1,j+1);
            scanf("%d",&mat[i][j]);
        }
    }
    return mat;
}

int main()
{
    int i,j;
    int **m1;
    m1=read();
    for(i=0; i<3; i++) {
        for( j=0; j<3; j++) {
            printf("%d",m1[i][j]);
        }
    printf("\n");
    }
    return 0;
}


/*#include<stdio.h>
void moran(int *);

void moran(int a[]) {
    printf("Array\n");
    for(int i=0; i<4; i++){
        printf("%d\t",a[i]);
    }
}
int main ()
{
    int a[4]={1,2,3,4};
    moran(a);
    return 0;
}
*/