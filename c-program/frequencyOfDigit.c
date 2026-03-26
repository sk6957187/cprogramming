#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    char *str,b;
    int p,c;
    str = malloc(1024 *sizeof(char));
    printf("Enter:-");
    scanf("%s",str); 
    for (int i=0; i<10; i++) {
        p=0;
        for(int j=0; j<strlen(str); j++) {
            if((str[j]-48) == i)
                p++;
        }
        printf("%d = %d \t",i,p);
    }
    return 0;
}