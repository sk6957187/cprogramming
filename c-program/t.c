
Date: August 12, 2017
Author: Harun-or-Rashid
1 Comment
Problem link–http://codeforces.com/problemset/problem/231/A

/*

Harun-or-Rashid

CSEDU-23rd Batch

*/

#include<stdio.h>

int main()
{
    int n,i,a[5],sum=0,count=0;
    scanf("%d",&n);
    while(n--){
    for(i=0;i<3;i++)
    {
      scanf("%d",&a[i]);
    }
    sum=0;
    for(i=0;i<3;i++)
    {
      if(a[i]==1) sum++;
    }
    if(sum>=2) count++;
    }
    printf("%d\n",count);
    return 0;

}