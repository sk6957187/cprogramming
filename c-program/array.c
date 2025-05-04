#include <stdio.h>
int main()
{
	int sum=0,n;
	printf("Enter n:");
	scanf("%d",&n);
	int arr[n];
	
	printf("Enter the %d number:-",n+1);
	for(int i=0; i<=n; i++) {
		scanf("%d",&arr[i]);
	}
	printf("given array :- ");
	for(int i=0; i<=n; i++){
		printf("%d\t",arr[i]);	
	}
	for(int i=0; i<=n; i++){
		sum=sum+arr[i];
		printf("Sum %d ",sum);
	}
	printf("Sum is = %d",sum);
	return 0;
}