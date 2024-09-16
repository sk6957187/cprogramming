#include<stdio.h>
int main()
{
	int x1,x2,x3,y1,y2,y3 ;
	float s1,s2,s3;
	printf("Enter the coordinate X, Y\n");
	scanf("%d %d",&x1,&y1);
    printf("Enter the coordinate X, Y\n");
	scanf("%d %d",&x2,&y2);
	printf("Enter the coordinate X, Y\n");
	scanf("%d %d",&x3,&y3);
	s1=(x2-x1)/(y2-y1);
	s2=(x3-x2)/(y3-y2);
	s3=(x3-x1)/(y3-y1);

	if (s1==s2 && s1==s3)
	{
		printf("point are collinear\n");

	}
	else
	{
		printf("point are not collinear\n");
	}

}