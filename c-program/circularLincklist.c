#include<stdio.h>
#include<stdlib.h>

struct node{
	int data;
	struct node *next;
};
struct node *start = NULL;
struct node* createnode(){
	struct node *n;
	n = (struct node*)malloc(sizeof(struct node));
	n->next=start;
	return(n);
}

void viewlist(){
	struct node *temp;
	//printf("1st element %d = \n",start->data);
	temp = start;
	if (start == NULL)
	{
		printf("Empty....");
	}
	else{
		int i=1;
		do{
			printf("%d element %d = \n",i,temp->data);
			temp=temp->next;
			i++;
		}while(temp!=NULL);
	}
	printf("\n");
}

int main()
{
	struct node *a,*temp,*t;
	int n;
	printf("Numbers of nodes-");
	scanf("%d",&n);
	for (int i = 0; i < n; i++)
	{
		a=createnode();
		printf("Enter number-");
		scanf("%d",a->data);
		if (start==NULL)
		{
			start=a;
		}
		if(start != NULL){
			printf("Fiiiiinal List:-\n");
			temp = start;
			t=temp->next;
			while(temp != t){
				t=t->next;
				printf("Fiiiiinalllll List:-\n");
			}
			t=a;
		}
	}
	printf("Final List:-\n");
	viewlist();
	printf("\n");
	return 0;
}