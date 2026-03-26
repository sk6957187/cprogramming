#include <stdio.h>
int main ()
{
	int i;
	char s[]="hellow";
	//char s[] = {'h','e','l','l','o','w'};
	
	for (i = 0; i < 7; i++)
	{
		printf("%c",s[i] );
	}
	printf("\n");
}