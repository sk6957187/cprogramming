#include <stdio.h>
int  main()
{
	int x, meter, inche;
	float feet;
	printf("\nEnter the distance\n");
    scanf("%d",&x);
    meter = x * 1000;
    inche = x * 1000 * 100;
    feet = x * 1000 * 100 / 12;
    printf("%d km is: %d meter\n", x, meter);
    printf("%d km is: %d inche\n", x, inche );
    printf("%d km is: %f feet\n", x, feet);
}