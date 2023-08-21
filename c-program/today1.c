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
			printf("%d, ",temp->data);
			temp=temp->next;
		}
	}
	printf("\n");
}

void deletenode(){
	struct node *temp;
	int num, prevNum, nextNum;
	temp=start;
	if(start==NULL){
		printf("list is empty...");
	}
	else{
		viewlist();
		printf("Which number deleted you-");
		scanf("%d",&num);
		printf("previousNum:-");
		scanf("%d",&prevNum);
		printf("next number:-");
		scanf("%d",&nextNum);
		while(temp != NULL && temp->next !=NULL){
			if (temp->data == prevNum && temp->next->next->data == nextNum)
			{
				temp->next=temp->next->next;
				viewlist();
				break; 
			}
			temp=temp->next;
		}
	}
}

void insertnode()
{
	struct node *temp,*t,*n;
	int ch;
	int newNum, previousNum, nextNum;
	temp = createnode();
	printf("1. New number enter \n");
    printf("2. New number enter between two number\n\n");
    scanf("%d",&ch);
    switch(ch) {
    	case 1:
    		temp = createnode();
    		printf("Enter new number --");
			scanf("%d",&temp->data);
			if (start==NULL){
				start=temp;
			}
			else{
				t=start;
				while(t->next !=NULL){
					t=t->next;
				}
			t->next=temp;
			}
			printf("Final list:-\n");
			viewlist();
		break;
	case 2:
		viewlist();
		printf("Enter new number, previes number & next number:- \n");
		scanf("%d",&newNum);
		scanf("%d",&previousNum);
		scanf("%d",&nextNum);
		temp=start;
		while(temp !=NULL && temp->next !=NULL) {
			if(temp->data==previousNum && temp->next->data==nextNum){
				n = createnode();
				n->data = newNum;
				n->next = temp->next;
				temp->next = n;
				break;
			}
			temp=temp->next;
		}
		printf("Final list :\n");
		viewlist();
	 break;
	}
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
	while(1) {
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