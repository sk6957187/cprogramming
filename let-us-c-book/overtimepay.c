#include<stdio.h>
int main()
{
	float otpay;
	int hour,i=0, E;
	printf("Enter number of employees\n");
	scanf("%d", &E);
	while(i<=E){
		printf("Enter no. of hours worked\n");
		scanf("%d", &hour);
		if(hour > 40){
			otpay = (hour - 40)*100;
			printf("overtime work Hours = %d ,\n", hour-40);
		}
		else
			otpay =0;

		printf("overtime pay = Rs.%f \n", otpay);
		i++;
	}
}