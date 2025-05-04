#include<stdlib.h>

struct stack {
    int data;
    struct stack *next;
};

struct stack *Top = NULL;

struct stack* _createnode() {
    struct stack *n;
    n = (struct stack *)malloc(sizeof(struct stack));
    n->next = NULL;
    return(n);
}

void StackPush(int x) {
    struct stack *temp,*t;   
    temp = _createnode();
    temp -> data = x;
    temp->next=NULL;
    if(Top==NULL) {
        Top = temp;
    }
    else {
        temp->next=Top;
        Top = temp;
    }
}


int StackPop() {
    int a;
    struct stack *temp;
    if(Top == NULL){
        printf("Underflow!!\n");
        return 0;
    }
    temp = Top;
    Top = Top -> next;
    a=temp -> data;
    free(temp);
    return a;
}

void StackShow() {
    int i;
    struct stack *temp, *t;
    temp = Top;
    if(temp == NULL){
        printf("\nNo element available");
        return;
    }
    printf("\nElements present in the stack: \n");
    t=Top;
    do {
        printf("%d\n",t -> data);
        t = t-> next;
    } while(t != NULL);
}

