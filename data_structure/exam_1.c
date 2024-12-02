#include <stdio.h>
int main()
{
  int i, first, last, middle, n, search, array[10];

  printf("Enter number of elements:");
  scanf("%d", &n);
  printf("Enter %d integers\n", n);
  for (i = 0; i < n; i++) {
    scanf("%d", &array[i]);
  }
  printf("Enter value to find:");
  scanf("%d", &search);

  first = 0;
  last = n - 1;
  middle = (first+last)/2;

  while (first <= last) {
    if (array[middle] < search)
      first = middle + 1;
    else if (array[middle] == search) {
      printf("%d found at location %d.\n", search, middle+1);
      break;
    }
    else
      last = middle - 1;

    middle = (first + last)/2;
  }
  if (first > last)
    printf("%d is Not found!\n", search);

  return 0;
}