#include<stdio.h>
#include<stdlib.h>
 
#define Size 4
 
int Top=-1,a;
int inp_array[Size];
void Push();
int Pop();
void show();


void Push()
{
    int x;
    if(Top == Size-1)
    {
        printf("\nOverflow!!");
    }
    else
    {
        printf("\nEnter element to be inserted to the stack:");
        scanf("%d",&x);
        Top=Top+1;
        inp_array[Top]=x;
        a=Top;
        printf("a-1=%d\n",a);

    }
}

int Pop()
{
    int s = 0;
    if(Top == -1)
    {
        printf("\nUnderflow!!");
    }
    while(Top !=0)
    {
        //printf("\nPopped element:  %d",inp_array[Top]);
        //s = inp_array[Top];
        Top=Top-1;
    }
    printf("\nPopped element:  %d",inp_array[Top]);
    s = inp_array[Top];
    return s;
}
 
void show()
{
    int i;
    printf("a=%d\n",a);
    printf("Top=%d\n",Top);
    if(Top==-1)
    {
        printf("\nNo element available");
    }
    else
    {
        printf("\nElements present in the stack: \n");
        for(i=a;i>0; i--) {
            printf("%d\n",inp_array[i]);
        }
    }
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
 
