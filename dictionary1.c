#include<stdio.h>
#include <string.h>

#define array_size 1000

char dictionary_array[array_size][20] = {"david", "enoch", "cheese", "donkey", "orange", "banana", "child", "globe", "family", "aeroplane", "vehicle", "shell", "plant", "treatment"};

int main() {
	char word_to_be_searched[20];
	int found = 0;
	printf("Enter string:\n");
	scanf("%s", word_to_be_searched);
	printf("Searching...: %s\n", word_to_be_searched);
	for (int i = 0; i < 15; ++i) {
		if (strcmp(dictionary_array[i], word_to_be_searched) == 0) {
			found = 1;
			break;
		}
	}
	if (found == 1) {
		printf("Found\n");
	} else {
		printf("Not Found\n");
	}
	return 0;
}
