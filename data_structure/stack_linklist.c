#include<stdio.h>
#include<stdlib.h>

struct node {
    int data;
    struct node *next;
};
struct node *start = NULL;

struct node* createnode() {
    struct node *n;
    n = (struct node *)malloc(sizeof(struct node));
    n->next = NULL;
    return(n);
}

void insertnode(int x) {
	struct node *temp,*t;	
	temp=createnode();
	//printf("Enter a number\n");
	//scanf("%d",&temp -> info);
	temp -> data = x;
	temp->next=NULL;
	if(start==NULL)
	{
		start = temp;
	}
	else
	{
		temp->next=start;
		start = temp;
		//while(t->next != NULL)
		//{
		//	t=t->next;
		//}
		//t->next=temp;
	}
}
void Push() {
	int x;
	printf("\nEnter element to be inserted to the stack: ");
	scanf("%d",&x);
	insertnode(x);
}

void show()
{
    int i;
    struct node *temp, *t;
    temp = start;
    if(temp == NULL){
        printf("\nNo element available");
        return;
    }
    printf("\nElements present in the stack: \n");
    t=start;
    do {
        
	    printf("%d\n",t -> data);
        t = t-> next;
    } while(t != NULL);
}

int Pop() {
	int a;
	struct node *temp;
	if(start == NULL){
        printf("Underflow!!\n");
        return 0;
    }

	temp = start;
	start = start -> next;
	a=temp -> data;
	free(temp);
	return a;
}


int main()
{
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
