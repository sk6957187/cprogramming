#include <stdio.h>


int main() 
{

    int n, len, min=0;
    printf("Enter the value:-");
    scanf("%d", &n);
  	// Complete the code to print the pattern.
    len = 2*n-1;
    for(int i=0; i<len; i++){
        for(int j=0; j<len; j++){
            min = i<j ? i:j;
            min = min<len-i ? min:len-i-1;
            min = min<len-j-1 ? min:len-j-1;
            printf("%d ",n-min);
        }
        printf("\n");
    }  
    return 0;
}