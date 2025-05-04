#include<stdio.h>

int main() {
    int n;
    scanf("%i",&n);
    switch(n>=100)
    {
        case true:
            printf("high");
            break;
        default:
            switch(n<=99&&n>=51)
            {
                case true:
                    printf("medium");
                    break;
                default:
                    switch(n<=50&&n>=40)
                    {
                        case true:
                            printf("low");
                            break;
                        default:
                            printf("try again");
                    }
            }
    }
  
    return 0;
}