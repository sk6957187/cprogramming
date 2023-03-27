#include <stdio.h>
#include <stdlib.h>

struct tree {
    int data;
    struct tree *left;
    struct tree *right;
};
struct tree *root=NULL;

struct tree* createnode()
{
    struct tree *n;
    n = (struct tree *)malloc(sizeof(struct tree));
    n->left = NULL;
    n->right = NULL;
    return(n);
}

struct tree * insertnode(struct tree *rootTemp, struct tree *newNode) {
    struct tree *temp, *t;

    if(rootTemp == NULL) {
        return newNode;
    }
    if (rootTemp->data > newNode->data) {
        rootTemp->left = insertnode(rootTemp->left, newNode);
    } else {
        rootTemp->right = insertnode(rootTemp->right, newNode);
    }
    return rootTemp;
}

void print(struct tree *rootTemp) {
    if (rootTemp == NULL) {
        return;
    }
    print(rootTemp->left);
    printf("%d\t", rootTemp->data);
    print(rootTemp->right);
}

int main() {
    struct tree *temp;
    int n,i;
    int array[100] = {1,12,3,34,6,7,9,10};
    n = 8;
    for(i=0; i<n; i++) {
        temp = createnode();
        temp->data = array[i];
        root = insertnode(root, temp);
    }
    printf("Final tree:\n");
    print(root);
    printf("\n");
    return 0;
}
