#include<stdio.h>
#include<string.h>
#define array_size 1000 

char dictionary[array_size][20] = {"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "apple", "banana", "orange", "guave", "papaya", "mango"};
int main()
{
	int found, i;
	char word_to_be_serch[20];
	printf("Enter the string\n");
	scanf("%s",word_to_be_serch);
	for(i=0; i<20; i++){
		if(strcmp(dictionary[i], word_to_be_serch)==0)
		{
			found=1;
			break;
		}
	}
	if(found==1)
		printf("Found\n");
	else
		printf("Not Found\n");

}