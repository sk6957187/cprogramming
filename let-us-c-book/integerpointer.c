#include <stdio.h>
// Pass by value
int increment(int y) {
    return y+1;
}
// Pass by reference
void increment2(int *intP) {
    (*intP)++;
}
int main ()
{
    int x = 2, l;
    int *p;
    p = &x;
    printf("x1 = %d\n",x);
    l = increment(x);
    printf("x2 = %d\n",x);
    printf("l = %d\n",l);
    increment2(p);
    printf("x3 = %d\n",x);
}