#include <stdio.h>


int viewlist(int *arr, int len){
	//printf("size %d\n",sizeof(arr)/sizeof(arr[0]));
	for (int i = 0; i < len; ++i)
	{
		printf("%d \t",arr[i]);
	}
	printf("\n");
	return 0;
}

int main()
{
	int n,count, len;
	count=0;
	printf("Enter total number number:-");
	scanf("%d",&n);
	int arr[n];
	len = sizeof(arr)/sizeof(arr[0]);
	//printf("lem = %d",len);
	for(int i=0; i<n; i++){
		arr[i]=i+1;
	}
	viewlist(arr,len);
	int temp[n];
	for(int i=0; i<sizeof(temp)/sizeof(temp[0]); i++){
		
		count++;
		for(int j=0; j<sizeof(temp)/sizeof(temp[0]); j++){
			if(j==i || j<i){
				temp[j]=arr[j];
			}
			else{
				temp[j]=arr[j+count];
			}
		}
		len=sizeof(temp)/sizeof(temp[0]);
		printf("!!!!!%d\n",len);
		for (int j = 0;  j< len; j++)
		{
			arr[j]=temp[j];
			printf("1-> %d ",arr[j]);
		}
		printf("\n");
		printf("(%d) Array list:-\n",i+1);
		len = sizeof(arr)/sizeof(arr[0]);
		viewlist(arr,len);
		temp[len];
	}
	int l;
	printf("Enter lucky number:-");
	scanf("%d",&l);
	for(int i=0; i<sizeof(arr)/sizeof(arr[0]); i++){
		if(l==arr[i]){
			printf("%d is a lucky no.",l);
			return 0;
		}
	}
	printf("%d is not lucky no.",l);
	return 0;

}