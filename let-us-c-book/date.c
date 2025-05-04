  
#include <dos.h>
#include <stdio.h>
  
int main()
{
    struct date dt;
  
    // This function is used to get
    // system's current date
    getdate(&dt);
  
    printf("System's current date\n");
    printf("%d/%d/%d",
           dt.da_day,
           dt.da_mon,
           dt.da_year);
  
    return 0;
}