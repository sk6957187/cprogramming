#include <stdio.h>
#include <stdlib.h>

struct link
{
  int data;
  struct link *next;
};
struct link *start=NULL;

struct link *insertEnd(struct link *);
void display(struct link *);

//-------------------------------------------------------------------


void menu();


int main()
{
  menu();
  printf("\n End of Program....");
}




void menu()
{
struct link *ptr, *cur;
//clrscr();
int ch=1;
while(ch != 0)
{
  printf("\n #######  MENU #########\
  \n\n Enter your choice:\
  \n1 FOR INSERT AT END :         \
  \n2 FOR INSERT AT BEGINING :     \
  \n3 FOR INSERT AT ANY POSITION :  \
  \n4 FOR INSERT AFTER ANY NODE :    \
  \n5 FOR DELETE FROM END :           \
  \n6 FOR DELETE FROM BEGINING :       \
  \n7 FOR DELETE FROM ANY POSITION :    \
  \n8 FOR DELETE ANY NODE :              \
  \n9 FOR TOTAL NODE COUNT :              \
  \n10 FOR DISPLAY :                       \
  \n11 FOR SEARCH  :                        \
  \n0 FOR EXIT :  ");
  scanf ( "%d", &ch );
  switch(ch)
  {
    case 1: start = insertEnd(start);      
    break;
    case 2: display(start);     
    break;
    case 0:
    break;
  default : printf("\nWrong choice ! Try again ..");
  }
}
}
/*#####################  INSERT END  ####################*/
struct link *insertEnd(struct link *start)
{
  struct link *new_node, *ptr;
  new_node = (struct link *) malloc(sizeof(struct link));
  if(new_node == NULL)
  {
    printf("\n Out of memory");
    exit(0);
  }
  printf("\n Enter the value : ");
  scanf("%d", &new_node->data);
  new_node->next = NULL;
  if(start == NULL)
  {
  start = new_node;
  }
  else
  {
  ptr = start;
  while(ptr->next != NULL)
  {
    ptr = ptr->next;
  }
  ptr->next = new_node;
  }
  return start;
}


//================


/*#####################  DISPLAY  ####################*/
void display(struct link *start)
{
  struct link *new_node, *ptr;
  ptr = start;
  if(start == NULL)
  {
    printf("\n Sorry! your list is empty \n");
  }
  else
  {
    printf("\n#### ALL ELEMENT PRESENT IN LIST ####\n");  
    while(ptr != NULL)
    {
      printf("%d ", ptr->data);
      ptr = ptr->next;
    }
  }
}