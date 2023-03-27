#include <stdio.h>
struct student {
	char name[20];
	int roll;
	float marks;
}student[5];

int main()
{
	int i;
	//printf("\nEnter the numbers of student: ");
	//scanf("%d",&n);
	//struct student student[n];
	for(i=0; i<5; i++) {
		printf("For roll number %d\n",i+1);
		printf("Enter first name :");
		scanf("%s",student[i].name);
		printf("Enter marks: ");
		scanf("%f",&student[i].marks);
	}
	printf("\nDisplaying Information...\n");
	for (i = 0; i < 5; i++)
	{
		printf("Roll %d\n",i+1);
		printf("Name: %s\n",student[i].name);
		printf("Marks: %.2f\n",student[i].marks);
		printf("\n");
	}
}