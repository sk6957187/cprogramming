#include<stdio.h>
#include<stdlib.h>
void viewlist();

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
	struct node *r,*t,*num;
	if(start==NULL)
	{
		printf("\n **List is empty**\n");
	}

	else
	{

		viewlist();
		printf("Whos number are delete\n");
		scanf("%d",&num->info);
		/*while(t->link != NULL)
		{
			printf("N -->%d\n",t->info );
			if(t->info == num->info)
			{
				//printf("%d\n",t->info);
				r=t->link;
				t->link=r->link;
				free(r);
				viewlist();
			}
			else
			{
				t=t->link;
			}
		}*/
		do
		{
			if(t->info == num->info)
			{
				printf("%d\n",t->info);
				r=t->link;
				t->link=r->link;
				free(r);
				viewlist();
			}
			t=t->link;

		}while(t->link != NULL);
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