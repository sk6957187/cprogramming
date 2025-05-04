#include<stdio.h>
int main()
{
	int m,n,team;
	team=0;
	printf("Enter expreance employee number:-");
	scanf("%d",m);
	printf("Enter non-expreance employee number:-");
	scanf("%d",n);
	while(m>=1 && n>=1 && m+n>=4){
		team++;
		m--;
		n--;
		printf("iiii\n");
	}
	printf("Numbers of team: \n");
	return 0;
}