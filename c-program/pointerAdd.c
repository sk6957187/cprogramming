#include <stdio.h>
void addition(int *, int *);

int main()
{
	int n1, n2,a;
	printf("Enter n1 & n2:-\n");
	scanf("%d",&n1);
	scanf("%d",&n2);
	addition(&n1,&n2);
	return 0;
}

void addition(int *x, int *y)
{
	int sum = 0;
	sum = *x+*y;
	printf("sum = %d",sum);
}


// #include <stdio.h>
// long add(long *, long *);
 
// int main()
// {
//    long first, second, *p, *q, sum;
 
//    printf("Input two integers to add\n");
//    scanf("%ld%ld", &first, &second);
 
//    sum = add(&first, &second);
 
//    printf("(%ld) + (%ld) = (%ld)\n", first, second, sum);
 
//    return 0;
// }

// long add(long *x, long *y) {
//    long sum;
   
//    sum = *x + *y;
//    printf("Sum = %ld\n",sum);
   
//    return sum;
// }