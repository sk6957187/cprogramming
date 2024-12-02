#include <stdio.h>
#include <string.h>

char *trim(char *str) {
    int i=0;
    if (str == NULL) {
        return str;
    }
    while(str[0] == ' ' && str[0] != '\0') {
        str++;
    }
    for (i=strlen(str)-1; i>=0; i--) {
        if (str[i] != ' ') {
            str[i+1] = '\0';
            break;
        }
    }
    return str;
}


int main(){
    char ch, *p;
    char s[80];
    char file[20][80];
    char *filename = "file.txt";
    int i = 0, fileLen;
    FILE *fp = fopen(filename, "r");
    while(fgets(s, 79, fp) != NULL) {
        p = trim(s);
        if (strlen(p) > 1) {
            strcpy(file[i], s);
            i++;
        }
    }
    fileLen = i;
    for (i=0; i<fileLen; i++) {
        printf("%s", file[i]);
    }
    fclose(fp);
    printf("\n");
    return 0;
}