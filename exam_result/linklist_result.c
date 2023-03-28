#include<stdio.h>
#include<stdlib.h>
void viewlist();

struct node {
    int rollNum;
    char name[120];
    char dist[120];
    char resultStatus[16];
    struct node *next;
};

struct node *start = NULL;

struct node* createnode()
{
    struct node *n;
    n = (struct node *)malloc(sizeof(struct node));
    n->next = NULL;
    return(n);
}
void insertnode()
{
    struct node *temp,*t,*n;
    struct node *nextNode, *previesNode, *newNode;
    int ch;
    int previousNum, nextNum, newNum;
    printf("1. New number enter \n");
    printf("2. New number enter between two number\n\n");
    printf("Enter  your sub choice:  ");
    scanf("%d",&ch);
    switch(ch)
    {
        case 1:
        {
            temp = createnode();
            printf("Enter a number --  ");
            scanf("%d",&temp->data);
            //temp->next=NULL;
            if(start==NULL)
            {
                start = temp;
            }
            else {
                t = start;
                while(t->next != NULL) {
                    t = t->next;
                }
                t->next=temp;
            }
            printf("Final list:\n");
            viewlist();
            break;
        }
        //
        case 2:
        {
            viewlist();
            printf("Enter previes number: ");
            scanf("%d",&previousNum);
            printf("Enter next number: ");
            scanf("%d",&nextNum);
            printf("Enter new number: ");
            scanf("%d",&newNum);
            t = start;
            while(t != NULL && t->next != NULL) {
                if(t->data == previousNum && t->next->data == nextNum) {
                    newNode=createnode();
                    newNode->data = newNum;
                    newNode->next = t->next;
                    t->next = newNode;
                    break;
                }
                t=t->next;
            }
            viewlist();
            break;
        }
        default:
            printf("invalid choice: %d\n", ch);
        break;
        //
    }
}
void deletenode()
{
    struct node *r,*t,*num;
    struct node *currentNode, *previesNode, *nextNode;
    currentNode=NULL;
    previesNode=NULL;
    nextNode=NULL;
    if(start==NULL)
    {
        printf("\n **List is empty**\n");
    }

    else
    {

        viewlist();
        num=createnode();
        printf("Whos number are delete\n");
        scanf("%d",&num->data);
        t=start;
        while(t != NULL)
        {
            //printf("N -->%d\n",t->data );
            if(t->data == num->data)
            {
                currentNode=t;
                nextNode=t->next;
                break;
                //printf("%d\n",t->data);
                //r=t->next;
                //t->next=r->next;
                //free(r);
                //viewlist();
            }
            previesNode=t;
            t=t->next;
        }
        //viewlist();
        if(currentNode!=NULL)
        {
            if(previesNode!=NULL)
            {
                previesNode->next=nextNode;
            }
            else
            {
                start=nextNode;
            }
            //viewlist();
            free(currentNode);
        }
        /*do
        {
            if(t->data == num->data)
            {
                printf("%d\n",t->data);
                r=t->next;
                t->next=r->next;
                free(r);
                viewlist();
            }
            t=t->next;

        }while(t->next != NULL);*/
    }
    viewlist();
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
            printf("%d\t", t->data);
            t=t->next;
        }
    }
    printf("\n");
}
int prog()
{
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