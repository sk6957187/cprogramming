#include<stdio.h>
#include<stdlib.h>

struct Node 
{
	int data;
	struct Node *next;
};
struct Node* createNode (int data)
{
	struct Node* newNode;
	newNode = (struct Node*)malloc(sizeof(struct Node));
	newNode -> next=NULL;
	newNode -> data = data;
	return newNode;
}




int main()
{
	struct Node* head=NULL;
	struct Node* firstNode = NULL;
	struct Node* secondNode = NULL;
	struct Node* thirdNode = NULL;
	firstNode = createNode(1);
	secondNode = createNode(2);
	thirdNode = createNode(3);

	firstNode->next=secondNode;
	secondNode->next=thirdNode;
	head=firstNode;
	while(head != NULL)
	{
		printf("%d\n",head->data );
		head=head->next;
	}
	return 0;

}