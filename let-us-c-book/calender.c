#include <stdio.h>
int main()
{
	int i,feb,date,month, year,leapdays,firstday,Mdays,Mdays1,feb1,lfeb;
	long int normalday,totaldays;
	Mdays = 0;
	Mdays1 = 0;
	printf("Enter the date:\n");
	scanf("%d",&date);
	printf("Enter the month:\n");
	scanf("%d",&month);
	printf("Enter the year:\n");
	scanf("%d",&year);
	month = (month - 1);
	//printf("month %d\n",month );(feb is this loop not count)
	if (year % 100 == 0 && year % 400 == 0)
	{
		lfeb = 1;  
	}
	if(year % 4 == 0)
	{
		lfeb = 1;
	}
	for ( i=1; i <= month; i++)
	{
		if (i==1 || i==3 || i==5 || i==7 || i==8 || i==10 || i==12)
		{
			Mdays = Mdays + 31;
			//printf("%d\n",Mdays );
		}
		if (i==4||i==6||i==9||i==11)
		{
			Mdays1 = Mdays1 + 30;
		}
		if (i==2)
		{
			feb =28;
		}
	}
	//printf("M %d\n",Mdays );
	//printf("M1 %d\n",Mdays1 );
	normalday = (year-1)*365;
	leapdays = (year-1)/4-(year-1)/100+(year-1)/400;
	//printf("lf %d\n",leapdays );
	totaldays = normalday+leapdays + Mdays1 +Mdays + lfeb + feb + date -1;
	//printf(" td %ld\n", totaldays );
	firstday = totaldays % 7;
	if (firstday == 0)
	{
		printf("Monday\n");
	}
	else if (firstday == 1)
	{
		printf("Tuesday\n");
	}
	else if (firstday == 2)
	{
		printf("wednesday\n");
	}
	else if (firstday == 3)
	{
		printf("thursaday\n");
	}
	else if (firstday == 4)
	{
		printf("Friday\n");
	}
	else if (firstday == 5)
	{
		printf("Saturday\n");
	}
	else if (firstday == 6)
	{
		printf("Sunday\n");
	}
}