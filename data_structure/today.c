#include<stdio.h>
#include <stdlib.h>

struct node {
	int data;
	struct node *next;
};

struct node *start=NULL;

struct node *currentNode {
	int n;
	n=(struct node *)malloc(sizeof(struct node));
	n->next=NULL;
	return n;
}

void insertnode()
{
	struct node *temp, *t;
	temp=createnode();
	printf("\nEnter No: ");
	scanf("%d",temp->data);
	temp->next=NULL;
	if(start==NULL) {
		start=temp;
	}
	else {
		t=start;
		while(t->next != NULL) {
			t=t->next;
		}
		t->next=temp;
	}
}

void viewlist()
{
	struct node *t;
	if(start==NULL) {
		printf("Empty\n");
	}
	else {
		t=start;
		while(t->next!=NULL) {
			printf("%d\n",t->data);
			t=t->next;
		}
	}

}