#include <stdio.h>
#include <math.h>
int main ()
{
	int x1,x2,y1,y2;
	float r,rad;
	printf("Enter the radius\n");
	scanf("%f",&r);

	printf("Enter the coordint of center\n");
	scanf("%d %d",&x1,&y1);
	printf("Enter the coordint of point\n");
	scanf("%d %d",&x2,&y2);
	rad = sqrt(pow(x2-x1,2) + pow(y2-y1,2));
	printf("Distance between coordint is %f\n",rad );
	if (r==rad)
	{
		printf("point on the circle\n");
	}	
    else if (r>rad)
    {
    	printf("point in the circle\n");
    }
    else
    {
    	printf("point out of circle\n");    
    }
}