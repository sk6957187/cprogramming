#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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
    int i;
    unsigned long n;
    //char input[20] = "3+5*4+2*2/2";
    char input[20] = "2-1+3";
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
    printf("Final tree:\n");
    print(root);
    convertTreeToPosix(posixArray, root);
    printf("\nR  %c ",posixArray[0]);
    printf("\n");
    return 0;
}
