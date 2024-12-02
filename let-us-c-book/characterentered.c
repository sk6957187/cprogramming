# include<stdio.h>
int main()
{
	char ch;
	printf("Enter the charecter \n");
	scanf("%c", &ch  );
	if(ch>=65 && ch<=90)
		printf("The charecter is upper case \n");
	else if(ch>=97 && ch <=122)
		printf("The charecter is lower case\n");
	else if(ch>=48 && ch <=57)
		printf("The charecter is a digit\n");
	else if((ch>=0 && ch<48)||(ch>57 && ch<65)||(ch>90 && ch<97)|| ch >122)
		printf("The charecter is a special symbel\n");
	
}