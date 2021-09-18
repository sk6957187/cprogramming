#include <stdio.h>
#include<time.h>
#include <stdlib.h>
#include "sumitcalender.c"

int main()
{
	int date,month, year;
	int firstday, dayInMonth, leapYear,i;
	//isLeapYear=0;
	char cur_time[128];
	time_t t;
	struct tm* ptm;
	t = time(NULL);
	ptm = localtime(&t);
	strftime(cur_time, 128, "%Y", ptm);
	//strftime(cur_time, 128, "%Y-%m-%d %H:%M:%S", ptm);
	printf("%s\n", cur_time);
	year=atoi(cur_time);
	leapYear=isLeapYear(year);
	printf("%d\n", leapYear);
	/*dayInMonth=gatNumberOfDaysInMonth(month,year);
	if(dayInMonth==29)
	{
		printf("%d is leap year\n", year);
	}
	else
	{
		printf("%d is not leap year\n", year);
	}
	printf("Days in month %d\n", dayInMonth);

	for(i=1;i<=dayInMonth; i++)
	{
		firstday = getDayNumber(i, month, year);
		printf("%d-%d-%d\t",i, month,year);
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
	}*/
}