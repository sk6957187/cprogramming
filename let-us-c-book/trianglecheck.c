#include <stdio.h>
int main()
{
	float a,b,c,s1,s2,s3;
	int sum,t;
    printf("prees 1, Enter angle\n");
    printf("prees 2, Enter side \n");
    scanf("%d",&t);
    if(t==1)
    {
	    printf("Enter angle a,b,c in dgree \n");
	    scanf("%f%f%f",&a,&b,&c);
        sum = a+b+c;
        if (sum == 180)
        {
    	   printf("triangle is valid\n");
        }
        else
        {
    	   printf("triangle is not valid\n");
        }
    }       
    if (t== 2)
    {
       printf("Enter the side a, b, c \n");
       scanf("%f %f %f", &a,&b,&c);
       if (a==b || b==c || a==c)
       {
           printf(" Isoscles triangle\n");
       }
       if (a==b && b==c)
       {
           printf("Equilateral triangle\n");
       }
       s1 = a*a == b*b + c*c;
       s2 = b*b == a*a + c*c;
       s3 = c*c == a*a + b*b;
       if (s1 || s2 || s3)
       {
          printf("Right angle triangle\n");
       }
       if (a != b && s2 != s3 && s3 != s1)
       {    
            printf("Scalene triangle\n");
       }
    else
    {
        printf("not triangle\n");
    }      
    }
    
}