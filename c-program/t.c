#include <stdio.h>
#include<string.h>

struct Student {
    char name[50];
    int roll;
    float marks;
};

int main() {
    
    struct Student students[3];
    
    for ( int i = 0; i < 3; i++) {
        printf("Enter details for student %d:\n", i + 1);
        printf("Name: ");
        gets(students[i].name);
        //fgets(students[i].name, sizeof(students[i].name), stdin);
        //students[i].name[strcspn(students[i].name,"\n")]=0;
        //scanf("%[^\n]s", students[i].name);  
        printf("Roll number: ");
        scanf("%d", &students[i].roll);
        printf("Marks: ");
        scanf("%f", &students[i].marks);
    }

    
    printf("\nDisplaying student information:\n");
    for (int i = 0; i < 3; i++) {
        printf("Student %d:\n", i + 1);
        printf("Name: %s\n", students[i].name);
        printf("Roll number: %d\n", students[i].roll);
        printf("Marks: %.2f\n", students[i].marks);
        printf("\n");
    }

    return 0;
}