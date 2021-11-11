// Assumtion
// Each number will be of single digit (i.e. 0 to 9)
// Each number will be >= 0
// Each number will be integer
// Max input length = 20
// All operator will be binary only

#include <stdio.h>
#include <string.h>
#include <stdbool.h>
void printArrayChar(char a[], int len) {
    for(int i=0; i<len; i++) {
        printf(" %c", a[i]);
    }
    printf("\n");
}
void printArrayInt(int a[], int len) {
    for(int i=0; i<len; i++) {
        printf(" %d", a[i]);
    }
    printf("\n");
}
int calculateValue(int num1, int num2, char op) {
    int result = 0;
    switch(op) {
        case '*':
            result = num1 * num2;
        break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
            }
        break;
        case '+':
            result = num1 + num2;
        break;
        case '-':
            result = num1 - num2;
        break;
    }
    return result;
}
int main ()
{
    int result = 0, len;
    char input[20], c;
    int numeric[20];
    char op[20];
    int i,j, opCount = 0, numCount = 0;
    bool lastCharOp = false, lastCharNum = false;
    printf("Enter input (2+2+2): ");
    scanf("%s", input);
    len = strlen(input);
    if (len > 20) {
        printf("Input length is greater than 20\n");
        return 0;
    }
    for(i=0; i<len; i++) {
        c = input[i];
        switch(c) {
            case '*':
            case '/':
            case '+':
            case '-':
                if (lastCharOp) {
                    printf("Invalid operator sequence\n");
                    return 0;
                }
                if (lastCharNum == false) {
                    printf("First char is operator\n");
                    return 0;
                }
                op[opCount] = c;
                opCount++;
                lastCharNum = false;
                lastCharOp = true;
            break;
            default:
                if (c < 48 || c > 57) {
                    printf("Invalid numberic input: %c\n", c);
                    return 0;
                }
                if (lastCharNum) {
                    printf("Invalid numeric sequence\n");
                    return 0;
                }
                numeric[numCount] = c-48;
                numCount++;
                lastCharNum = true;
                lastCharOp = false;
            break;
        }
    }
    if (lastCharOp) {
        printf("Last charter is operator\n");
        return 0;
    }
    printArrayChar(op, opCount);
    printArrayInt(numeric, numCount);
    for(i=0; i<numCount; i++) {
        if (i==0) {
            result = numeric[i];
            continue;
        }
        result = calculateValue(result, numeric[i], op[i-1]);
    }
    printf("Final result: %d\n", result);
    return 0;
}