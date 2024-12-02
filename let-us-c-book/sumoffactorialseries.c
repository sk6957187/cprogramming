#include<stdio.h>
#include<math.h>
int fac(int x) {
    if(x>1){
        printf("x=%d\n",x);
        return x*fac(x-1);
    }
    else{
        return 1;
    }
}
int main()
{
    int i,j,n,fac1,fac2,sum,f;
    sum=0;
    j=2;
    printf("Enter thr number:-");
    scanf("%d",&n);

    for(i=1; i<=n-1; i++) {
        fac1=fac(i);
        printf("%d fac1=%d\n",i,fac1);
        fac2=fac(j);
        printf("%d fac2=%d\n",j,fac2);
        j++;
        f=fac1*fac2;
        sum=sum+f;
        printf("sum %d\n", sum);

    }
    printf("Answer is %d",sum);
}