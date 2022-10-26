#include <stdio.h>
int main()
{
    int weight;
    scanf("%d",&weight);
    if (weight >0 && weight<=100){
        if (weight % 2 == 0 && weight !=2){
            printf("YES\n");
        }
        else{
            printf("NO\n");
        }
    }
    return 0;
}