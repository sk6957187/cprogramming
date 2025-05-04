#include <stdio.h>
#include <stdlib.h>

int main()
{
    int num, *arr, i;
    int t,j;
    scanf("%d", &num);
    arr = (int*) malloc(num * sizeof(int));
    for(i = 0; i < num; i++) {
        scanf("%d", arr + i);
    }


    /* Write the logic to reverse the array. */
    if(num%2 == 0){
        j=num-1;
        for(i=0; i<num/2; i++){
            t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
            j--;
        }
    }
    else {
        j=num-1;
        for(i=0; i<=(num/2)-1; i++){
            t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
            j--;
        }
    }

    for(i = 0; i < num; i++)
        printf("%d ", *(arr + i));
    return 0;
}