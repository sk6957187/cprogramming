#include <stdio.h>
int main ()
{
	char ch;
	printf("Enter charecter\n");
	scanf("%c", &ch);
	ch >=97 && ch <=122 ? printf("charecter entered is lower case\n"):printf("charecter entered is
		not lower case\n");
	return 0;
}