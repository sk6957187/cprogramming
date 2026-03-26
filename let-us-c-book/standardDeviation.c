#include <stdio.h>
#include <math.h>
void fun(int*,int*,double*);

int main()
{
	int sum, avg;
	double stdev;
	fun(&sum, &avg, &stdev);
	printf("sum = %d\n average = %d\n standard deviation = %lf\n",sum,avg,stdev );
	return 0;
}

void fun(int *sum,int *avg, double *stdev)
{
	int N,b,a,i;
	int n[100];
	printf("Enter total number:\n");
	scanf("%d", &N);
	printf("Enter +ve integer number:\n");
	for (i = 0; i < N; ++i)
	{
		scanf("%d",&n[i]);
	}
	*sum=0;
	for (i = 0; i < N; ++i)
	{
		*sum= *sum+n[i];
	}
	*avg=*sum/N;
	for (i = 0; i <N; ++i)
	{
		a=pow((n[i]-*avg),2);
		b=b+a;
	}
	*stdev=sqrt(b/4);
}