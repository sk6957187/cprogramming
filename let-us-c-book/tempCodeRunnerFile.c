#include<stdio.h>
#include<math.h>

int main()
{  
    int a[100];
    int i,j, small,big,num,range,limit;
    printf("Enter the limit:-");
    scanf("%d",&limit);
    printf("Enter %d numbers\n",limit);
    for(i=0; i<limit; i++) {
        scanf("%d",&a[i]);
    }
    small=big=a[0];
    for(i=1; i<limit; i++) {
        printf("%d\t",a[i]);
        if(small>a[i]){
            small=a[i];
        }
        if(big<a[i]){
            big=a[i];
        }
    }
    range=big-small;
    printf("B %d\n",big);
    printf("S %d\n",small);
    printf("R %d\n",range);
}