#include<stdio.h>
#include<math.h>

int main()
{  
    float a[100];
    int n,i,P,N,Z;
    P=N=Z=0;
    printf("Enter the numbers of number:-");
    scanf("%d",&n);
    for(i=0; i<n; i++) {
        scanf("%f",&a[i]);
    }
    for(i=0; i<n; i++) {
        if(a[i]>0) {
            P=P+1;
        }
        if(a[i]<0) {
            N=N+1;
        }
        if(a[i]==0) {
            Z=Z+1;
        }
    }
    printf("P=%d\n",P);
    printf("N=%d\n",N);
    printf("Z=%d\n",Z);
}