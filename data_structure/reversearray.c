#include <stdio.h>    
     
int main()    
{    
    int length, i,n,j;
    length=0;
    int arr[n]; //= {1, 2, 3, 4, 5};
    //Calculate length of array arr
    printf("Enter numbers of number\n");
    scanf("%d",&n);
    printf("Enter number in increasing order\n");
    for ( i = 0; i < n; i++)
    {
        scanf("%d",&arr[i]);
    }
        
    for ( i = 0; i <n; i++) 
    {          
    }      
        
    printf("\n");    
        
    printf("Number in decreasing order: \n");    
    //Loop through the array in reverse order    
    for (i = n-1; i >= 0; i--) 
    {     
        printf("%d ", arr[i]);     
    }     
    return 0;    
}