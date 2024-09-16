#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {

    char *s;
    int len;
    s = malloc(1024 * sizeof(char));
    printf("Enter string:- ");
    scanf("%[^\n]", s);
    s = realloc(s, strlen(s) + 1);
    //len = strlen(s);
    for(int i=0; s[i] != '\0'; i++) {       //print one word in one line.
        if(s[i] == ' ')
            printf("\n");
        else {
        printf("%c",s[i]);
        }
    }
    printf("\n");
    for (int i = 0; s[i] != '\0'; ++i)      //print all word in singal line
    {
        printf("%c",s[i]);
    }
    return 0;
}