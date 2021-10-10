#include <stdio.h>
void circshift(int*, int*, int*);

int  main()
{
	int x,y,z;
	//int x=5, y=8, z=10;
	printf("Enter three numbers\n");
	scanf("%d %d %d",&x,&y,&z);
	
	printf("Enter three number: x=%d, y=%d, z=%d\n", x,y,z);
	circshift(&x, &y, &z);
	printf("Result: x=%d, y=%d, z=%d\n", x, y, z);
	return 0;
}
void circshift(int *x, int *y, int *z)
{
	int t;
	t = *y;
	*y = *z;
	*z = *x;
	*x = t;
}