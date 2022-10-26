#include<stdio.h>
#include<stdlib.h>

struct Node 
{
	int data;
	struct Node *next;
};
int main()
{
	struct Node* head=NULL;
	struct Node* firstNode = NULL;
	struct Node* secondNode = NULL;
	struct Node* thirdNode = NULL;
	firstNode = (struct Node*)malloc(sizeof(struct Node));
	firstNode -> next=NULL;
	firstNode -> data = 1;
	secondNode = (struct Node*)malloc(sizeof(struct Node));
	secondNode -> next=NULL;
	secondNode -> data = 2;
	thirdNode = (struct Node*)malloc(sizeof(struct Node));
	thirdNode -> next=NULL;
	thirdNode -> data = 3;

	firstNode->next=secondNode;
	secondNode->next=thirdNode;
	head=firstNode;
	do{
		printf("%d\n",head->data );
		head=head->next;
	}while(head != NULL);

	return 0;

}