#include <stdio.h>
#include <stdlib.h>

int main()
{
	int t,i,j,max,*p,choice;
	printf("Enter the size of array :-");
	scanf("%d",&max);
	p=(int*)malloc(max*sizeof(int));
	for(i=0; i<max; i++) {
		//p[i]=i*i;
		scanf("%d", &p[i]);
		//printf("p[%d] = %d\n",i,p[i]);
	}
	printf("\n Enter array is :");
	for(i=0; i<max; i++) {
		printf(" %d ",p[i]);
	}
	printf("\n1.for increasing order\n 2.for decreasing order\n ");
	printf("3.for exit\n");
	scanf("%d",&choice);
	switch(choice)
	{
		case 1:
			for(i=0; i<max; i++){
				for(j=i+1; j<max; j++){
					if (p[i]>p[j])
					{
						t=p[i];
						p[i]=p[j];
						p[j]=t;
					}
				}
			}
			printf("increasing order:-");
			printArray(&p[0],max);
		break;

		case 2:
			for(i=0; i<max; i++){
				for(j=i+1; j<max; j++){
					if (p[i]<p[j])
					{
						t=p[i];
						p[i]=p[j];
						p[j]=t;
					}
				}
			}
			printf("decreasing order:-");
			printArray(&p[0],max);
		break;
	case 3:
		printf("---program end---");
		exit(0);
	default:
		printf("\nWrong choice!!");
	}
	
	
	return 0;
}
void printArray(int p[],int max) {
	for(int m=0; m<max; m++) {
		printf(" %d ",p[m]);
	}
}