#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<time.h> 

int main()
{
	char *buf;
	char cur_time[128];
	time_t t;
	struct tm* ptm;
	t = time(NULL);
	ptm = localtime(&t);
	strftime(cur_time, 128, "%Y-%m-%d %H:%M:%S", ptm);
	printf("\nDate: %s \n", cur_time);

	buf=(char *)malloc(25*sizeof(char));
	buf=getlogin();
	printf("User_Name: %s \n",buf);
}