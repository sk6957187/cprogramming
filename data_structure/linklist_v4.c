#include<stdio.h>
#include<stdlib.h>

struct node 
{
	int info;
	struct node *link;
};
struct node *start = NULL;

struct node* createnode()
{
	struct node *n;
	n = (struct node *)malloc(sizeof(struct node));
	//printf("SS %d\n", n);
	return(n);
}
void insertnode()
{
	struct node *temp,*t;	
	temp=createnode();
	printf("Enter a number\n");
	scanf("%d",&temp -> info);
	temp->link=NULL;
	if(start==NULL)
	{
		start=temp;
	}
	else
	{
		t=start;
		while(t->link != NULL)
		{
			t=t->link;
		}
		t->link=temp;
	}
}
void deletenode()
{
	struct node *r;
	if(start==NULL)
	{
		printf("\n **List is empty**\n");
	}
	else
	{
		r=start;
		start=start->link;
		free(r);
	}
}
void viewlist()
{
	struct node *t;
	if (start==NULL)
	{
		printf("\n**List is empty**\n");
	}
	else
	{
		t=start;
		while(t != NULL)
		{
			printf("%d\n", t->info);
			t=t->link;
		}
	}
}
int prog()
{
	int ch;
	printf("\n*******");
	printf("\n1 Add value to the list");
	printf("\n2 delete first value");
	printf("\n3 View list");
	printf("\n4 Exit");
	printf("\n Enter your choice: ");
	scanf("%d",&ch);
	//prog(ch);
	return(ch);
}
int main()
{
	while(1)
	{
		switch(prog())
		{
			case 1:
				insertnode();
				break;
			case 2:
				deletenode();
				break;
			case 3:
				viewlist();
				break;
			case 4:
				exit(0);
			default:
				printf("Invalid choice\n");
		}
	}
}