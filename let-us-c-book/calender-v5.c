#include <stdio.h>
#include<time.h>
#include <stdlib.h>
#include "sumitcalender.h"



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
	strftime(cur_time, 128, "%Y-%m-%d %H:%M:%S", ptm);
	printf("%s\n", cur_time);
	//strftime(cur_time, 128, "%Y-%m-%d %H:%M:%S", ptm);

	strftime(cur_time, 128, "%Y", ptm);
	year=atoi(cur_time);
	leapYear=isLeapYear(year);
	if(i==1)
	{
		printf("%d\n", leapYear);
	}
	strftime(cur_time, 128, "%m", ptm);
	//printf("%s\n",cur_time );
	month=atoi(cur_time);
	switch(month)
	{
		case 1:
			printf("Month January\n");
			break;
		case 2:
			printf("Month February\n");
			break;
		case 3:
			printf("Month March\n");
			break;
		case 4:
			printf("Month April\n");
			break;
		case 5:
			printf("Month May\n");
			break;
		case 6:
			printf("Month June\n");
			break;
		case 7:
			printf("Month July\n");
			break;
		case 8:
			printf("Month August\n");
			break;
		case 9:
			printf("Month September\n");
			break;
		case 10:
			printf("Month October\n");
			break;
		case 11:
			printf("Month November\n");
			break;
		case 12:
			printf("Month December\n");
			break;

	}
	dayInMonth=gatNumberOfDaysInMonth(month,year);
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
	}
}