#include<stdio.h>
#include<stdlib.h>

struct Node 
{
	int data;
	struct Node *next;
};
int main()
{
	struct Node* firstNode = NULL;
	firstNode = (struct Node*)malloc(sizeof(struct Node));
	firstNode -> next=NULL;
	firstNode -> data = 1;
	printf("%d\n",firstNode->data );
	return 0;

}