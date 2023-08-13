 #include <stdio.h>
 #include<stdlib.h>

// struct Node{
// 	int data;
// 	struct Node * Next;
// };

// void linkedListTraversal(struct Node* ptr){
// 	while(ptr != NULL) {
// 		printf("Element = %d\n",ptr->data);
// 		ptr = ptr->Next;
// 	}
// }

// int main()
// {
// 	int n,a;
// 	struct Node *head;
// 	struct Node *second;
// 	struct Node *third;
// 	struct Node *fourth;

// 	head = (struct Node*)malloc(sizeof(struct Node));
// 	second = (struct Node*)malloc(sizeof(struct Node));
// 	third = (struct Node*)malloc(sizeof(struct Node));
// 	fourth = (struct Node*)malloc(sizeof(struct Node));

// 	head -> data=1;
// 	head->Next=second;
// 	second -> data=2;
// 	second->Next=third;
// 	third -> data=3;
// 	third->Next=fourth;
// 	fourth -> data=4;
// 	fourth->Next=NULL;

// 	linkedListTraversal(head);

// 	return 0;
// }


struct node{
	int data;
	struct node * next;
};

struct node *start = NULL;

struct node* createnode()
{
	struct node *n;
	n=(struct node *)malloc(sizeof(struct node));
	n->next=NULL;
	return(n);
}

void viewlist()
{
	struct node *temp;
	if(start==NULL){
		printf("List is empty\n");
	}
	else{
		temp=start;
		while(temp != NULL){
			printf("%d",temp->data);
			temp=temp->next;
		}
	}
	printf("\n");
}

void insertnode()
{
	struct node *temp,*t;
	temp = createnode();
	printf("Enter the number --");
	scanf("%d",&temp->data);
	if (start==NULL){
		start=temp;
	}
	else{
		t=start;
		while(t !=NULL){
			t=t->next;
		}
		printf("\n1__\t");
		t->next=temp;
		printf("2\t");
	}
	printf("Final list:-\n");
	viewlist();
}

int prog(){
	int ch;
    printf("*******\n");
    printf("1 Add value to the list\n");
    printf("2 delete first value\n");
    printf("3 View list\n");
    printf("4 Exit\n");
    printf("Enter your choice:  ");
    scanf("%d",&ch);
    //prog(ch);
    return(ch);
}

int main()
{
	while(1)
		switch(prog()){
			case 1:
                insertnode();
                break;
	        case 4:
	                exit(0);
	         default:
	                printf("Invalid choice\n");
		}
	
}