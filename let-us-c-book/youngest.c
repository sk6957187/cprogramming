 #include<stdio.h>
int main()
{
	int age,R,S,A;
	printf("enter age Ram, Shayam, Ajay\n");
	scanf("%d%d%d",&R,&S,&A);
	if (R>S && R>A)
	{
		printf("ram is younger\n");
	}
	else if (S>R && S>A)
	{
		printf("Shayam is younger\n");
	}
	else if (A>R && A>S)
	{
		printf("Ajay is younger\n");
	}
}