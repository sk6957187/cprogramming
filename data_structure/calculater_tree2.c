#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define Size 20
int Top=-1;
char inp_array[Size];

struct tree {
    char data;
    struct tree *left;
    struct tree *right;
};
struct tree *root=NULL;
int INDEX = 0;

void print(struct tree *rootTemp) {
    if (rootTemp == NULL) {
        return;
    }
    print(rootTemp->left);
    print(rootTemp->right);
    printf("%c ", rootTemp->data);
}
struct tree* createnode()
{
    struct tree *n;
    n = (struct tree *)malloc(sizeof(struct tree));
    n->left = NULL;
    n->right = NULL;
    return(n);
}

void Push(char dataChar)
{
    int x;
    if(Top == Size-1)
    {
        printf("\nOverflow!!");
    }
    else
    {
        Top=Top+1;
        inp_array[Top]=dataChar;
    }
}

int Pop()
{
    int s = 0;
    if(Top == -1)
    {
        printf("Underflow!!\n");
    }
    else
    {        
        printf("Popped element:  %d\n",inp_array[Top]);
        s = inp_array[Top];
        Top=Top-1;
        
    }
    return s;

}

int evalutae(char posixArray[], int length) {
    int i, a, b, c;
    int result;
    for(i=0; i<length; i++) {
        if(posixArray[i] >= 48 && posixArray[i] <=57) {
            Push(posixArray[i]-48);
            continue;
        }
        a = Pop();
        b = Pop();
        if(posixArray[i] == '+') {
            c = a+b;
        }
        if(posixArray[i] == '-') {
            c = b-a;
        }
        if(posixArray[i] == '*') {
            c = a*b;
        }
        if(posixArray[i] == '/') {
            c = b/a;
        }
        Push(c);
    }
    result = Pop();
    return result;
}

void convertTreeToPosix(char posix[], struct tree *rootTemp) {
    if (rootTemp == NULL) {
        return;
    }
    convertTreeToPosix(posix, rootTemp->left);
    convertTreeToPosix(posix, rootTemp->right);
    posix[INDEX++] = rootTemp->data;
}

int isSymbol(char data) {
    if (data == '+' || data == '-' || data == '*' || data == '/') {
        return 1;
    }
    return 0;
}
int isNewNodeHasHighPrecedence(struct tree *rootTemp, char data) {
    if (rootTemp == NULL) {
        return 0;
    }
    if (rootTemp->data == data) {
        return 0;
    }
    switch(rootTemp->data) {
        case '-':
        case '+':
            if (data == '*' || data == '/') {
                return 1;
            }
        break;
        case '*':
            if (data == '/') {
                return 1;
            }
        break;
        case '/':
        default:
        break;
    }
    return 0;
}
struct tree * insertnode(struct tree *rootTemp, struct tree *newNode, char data) {
    struct tree *temp, *t;
    if(rootTemp == NULL) {
        return newNode;
    }
    if (rootTemp->data >= 48 && rootTemp->data <= 57) {
        if (isSymbol(data)) {
            newNode->left = rootTemp;
            rootTemp = newNode;
        }
    } else if (isSymbol(rootTemp->data)) {
        if (isSymbol(data)) {
            if (isNewNodeHasHighPrecedence(rootTemp, data)) {
                rootTemp->right = insertnode(rootTemp->right, newNode, data);
            } else {
                newNode->left = rootTemp;
                rootTemp = newNode;
            }
        } else {
            rootTemp->right = insertnode(rootTemp->right, newNode, data);
        }
    }
    return rootTemp;
}


int main() {
    struct tree *temp;
    int i, result;
    unsigned long n;
    /**
     * 2+2 = 4
     * 3+5*4+2*2/2 = 3+20+2/1 = 3+20+2 = 25
     * 2/2*2+2+4*5+3 = 1*2+2+20+3 = 27
     * 2+3-1=4
     * 2-1+3=4
     * 4/2+3-2*5=2+3-10=-5
     * 3-2*5+4/2=3-10+2=-5
     * 3-2*5*8+4/2=3-80+2=-75
     * */
    char input[20] = "3-2*5*8+4/2";
    char posixArray[20];
    // printf("Enter input (2+2+2): ");
    // scanf("%s", input);
    n = strlen(input);
    for(i=0; i<n; i++) {
        temp = createnode();
        temp->data = input[i];
        root = insertnode(root, temp, input[i]);
    }
    printf("\n");
    printf("Input: %s\n", input);
    printf("Final tree:\n");
    print(root);
    printf("\n");
    convertTreeToPosix(posixArray, root);
    result = evalutae(posixArray,n);
    printf("Final result: %d\n", result);
    return 0;
}
