/* C Program to multiple two given numbers */
#include <stdio.h>
int main() {
    int number1, number2, area, perimeter;
   
    printf("Enter lenght and breath of rectangle\n");
    scanf("%d%d",&number1,&number2);
    area = number1 * number2;

    perimeter = 2*(number1+number2);
    printf("The area is: %d\n", area);
    printf("the perimeter is : %d\n",perimeter );
    return 0;
}