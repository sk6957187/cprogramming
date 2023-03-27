#include <stdio.h>

int main(){
    char ch;
    char *filename = "file.txt";
    FILE *fp = fopen(filename, "r");
    while(1 && fp != NULL) {
        ch = fgetc(fp);
        if (ch == EOF) {
            break;
        }
        if (ch == 10) {

        }
        printf("%c", ch);
    }
    fclose(fp);
    printf("\n");
    return 0;
}