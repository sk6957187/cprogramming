#include <stdio.h>
int main()
{
    long long p, q, a, n, g_count, area_t, area_g;
    long long x, y;
    p = 6; q = 6; a = 4;
    scanf("%lld %lld %lld",&p, &q, &a);
    area_t = p*q;
    area_g = a*a;
    if (p % a == 0) {
        x = p/a;
    } else {
        x = p/a + 1;
    }
    if (q % a == 0) {
        y = q/a;
    } else {
        y = q/a + 1;
    }
    g_count = x*y;
    printf("%lld\n",g_count);
}