#include <stdio.h>
int getDayNumber(int date, int month, int year)
{
	int i,dayInFeb,leapDays,day,mDays,mDays1,isLeapYear;
	long int normalday,totaldays;
	mDays = 0;
	mDays1 = 0;
	isLeapYear = 0;
	dayInFeb = 0;
	month = (month - 1);
	//printf("month %d\n",month );(feb is this loop not count)
	if (year % 100 == 0 && year % 400 == 0)
	{
		isLeapYear = 1;  
	}
	if(year % 4 == 0)
	{
		isLeapYear = 1;
	}
	for ( i=1; i <= month; i++)
	{
		if (i==1 || i==3 || i==5 || i==7 || i==8 || i==10 || i==12)
		{
			mDays = mDays + 31;
			//printf("%d\n",Mdays );
		}
		if (i==4||i==6||i==9||i==11)
		{
			mDays1 = mDays1 + 30;
		}
		if (i==2)
		{
			dayInFeb =28;
		}
	}
	//printf("M %d\n",Mdays );
	//printf("M1 %d\n",Mdays1 );
	normalday = (year-1)*365;
	leapDays = (year-1)/4-(year-1)/100+(year-1)/400;
	//printf("lf %d\n",leapdays );
	totaldays = normalday+leapDays + mDays1 +mDays + isLeapYear + dayInFeb + date -1;
	//printf(" td %ld\n", totaldays );
	day = totaldays % 7;
	return day;

}
int main()
{
	int date,month, year;
	int firstday;
	printf("Enter the date:\n");
	scanf("%d",&date);
	printf("Enter the month:\n");
	scanf("%d",&month);
	printf("Enter the year:\n");
	scanf("%d",&year);
	firstday = getDayNumber(date, month, year);
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