#include<stdio.h>
int main() {
	int loopCount = 10;
	for (int i = 0; i < loopCount; ++i) {
		if (i==5) {
			break;
		}
		printf("%d Not break\n", i);
	}
	for (int i = 0; i < loopCount; ++i) {
		if (i==5) {
			continue;
		}
		printf("%d Not 5\n", i);
	}
	return 0;
}