#include<stdio.h>
#include<stdlib.h>
#include "partial_stack_linklist.h"

void Push() {
	int x;
	printf("\nEnter element to be inserted to the stack: ");
	scanf("%d",&x);
	StackPush(x);
}

void show() {
    StackShow();
}

int Pop() {
	return StackPop();
}

int main() {
    int choice;
    while(1)    
    {
        printf("\n**********");
        printf("\nOperations performed by Stack");
        printf("\n1.Push the element\n2.Pop the element\n3.Show\n4.End");
        printf("\nEnter the choice: ");
        scanf("%d",&choice);
        
        switch(choice)
        {
            case 1:
                Push();
            break;
            case 2:
                Pop();
            break;
            case 3:
                show();
            break;
            case 4:
                exit(0);
            default: printf("\nInvalid choice!!");
        }
    }
}
