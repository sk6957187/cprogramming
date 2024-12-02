#include <stdio.h>

int main()
{
	int x1,x2,x3,y1,y2,y3;
	float s1,s2,s3;
    printf("enter the coordinate of first point\n");
    scanf("%d%d",&x1,&y1);
    printf("enter the coordinate of second point\n");
    scanf("%d%d",&x2,&y2);
    printf("enter the coordinate of thired point\n");
    scanf("%d%d",&x3,&y3);
    //calculate the slope
    s1 =  (x2-x1)/(y2-y2);
    s2 =  (x3-x1)/(y3-y1);
    s3 =  (x3-x2)/(y3-y2);

    if (s1==s2 && s2==s3)
    {
    	printf("point are co-linear\n");

    }
    else
    {
    	printf("point are not co-linear\n");
    }
    
    
}
   


