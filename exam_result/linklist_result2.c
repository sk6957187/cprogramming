#include<stdio.h>
#include<stdlib.h>
#include<string.h>

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
void insertnode(struct node *newNode) {
    struct node *t;
    if(start==NULL) {
        start = newNode;
    }
    else {
        t = start;
        while(t->next != NULL) {
            t = t->next;
        }
        t->next=newNode;
    }
}
void insertnodeV2(){
    struct node *temp,*t,*newNode;
    int i;
    int roll;
    int num;
    char name,dist,resultStatus;
    newNode=NULL;
    printf("\nNumbers of student: ");
    scanf("%d",&num);
    for (i = 0; i < num; i++){
        newNode=createnode();
        printf("\nEnter roll number: ");
        scanf("%d",&newNode->rollNum);
        printf("\nEnter name: ");
        scanf("%s",newNode->name);
        printf("\nEnter district name: ");
        scanf("%s",newNode->dist);
        printf("\nEnter result (pass/fail): ");
        scanf("%s",newNode->resultStatus);
        insertnode(newNode);
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
            printf("%d,%s,%s,%s\n", t->rollNum,t->name,t->dist,t->resultStatus);
            t=t->next;
        }
    }
    printf("\n");
}

void search()
{
    int i,x,r;
    char dist[20];

    struct node *newNode, *t;
    newNode = start;
    //printf("Enter roll number:  ");
    //scanf("%d",&x);
    printf("Enter district name: ");
    scanf("%s",dist);
    while (newNode != NULL)
    {
        if (newNode->rollNum == x){
            printf("%d %s %s %s\t", newNode->rollNum,newNode->name,newNode->dist,newNode->resultStatus);
        }
        //printf("D-%s\n",newNode->dist);
        if(strcmp(newNode->dist, dist) == 0) {
            printf("%d,%s,%s,%s\n", newNode->rollNum,newNode->name,newNode->dist,newNode->resultStatus);
        }
        newNode = newNode->next;
    }
    return ;
}

char *trim(char *str) {
    int i=0;
    if (str == NULL) {
        return str;
    }
    while(str[0] == ' ' && str[0] != '\0') {
        str++;
    }
    for (i=strlen(str)-1; i>=0; i--) {
        if (str[i] != ' ') {
            str[i+1] = '\0';
            break;
        }
    }
    return str;
}
void insertNodeData(struct node* newNode, char *str) {
    char *token = strtok(str, ",");
    char finalToken[20][20];
    int len = 0, i, rollNum;
    while(token != NULL) {
        strcpy(finalToken[len], token);
        len++;
        token = strtok(NULL, ",");
    }
    if (len > 1) {
        newNode->rollNum = atoi(finalToken[0]);
        strcpy(newNode->name, finalToken[1]);
        strcpy(newNode->dist, finalToken[2]);
        strcpy(newNode->resultStatus, finalToken[3]);
    }
    return;
}

char readFromFile() {
    char ch, *p;
    char s[80];
    char file[20][80];
    struct node *newNode;
    char *filename = "../file_handaling/file.txt";
    int i = 0, fileLen;
    FILE *fp = fopen(filename, "r");
    while(fgets(s, 79, fp) != NULL) {
        p = trim(s);
        if (strlen(p) > 1) {
            strcpy(file[i], s);
            i++;
        }
    }
    fileLen = i;
    for (i=0; i<fileLen; i++) {
        newNode = createnode();
        insertNodeData(newNode, file[i]);
        insertnode(newNode);
    }
    fclose(fp);
    printf("\n");
    return 0;
}    


int prog()
{
    int ch;
    printf("*******\n");
    printf("1 Add value to the list\n");
    printf("2 View list\n");
    printf("3 Search\n");
    printf("4 Exit\n");
    printf("Enter your choice:  ");
    scanf("%d",&ch);
    //prog(ch);
    return(ch);
}

int main()
{
    readFromFile();
    viewlist();
    while(1)
    {
        switch(prog()) {
            case 1:
                insertnodeV2();
                break;
            case 2:
                viewlist();
                break;
            case 3:
                search();
                break;
            case 4:
                exit(0);
            default:
                printf("Invalid choice\n");
        }
    }
}
