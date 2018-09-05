#include <stdio.h>
int main() {
	int numOne;
	int numTwo;

	char operation[10];

	while (1)
	{
		printf("\nPlease enter an integer: ");
		scanf_s("%d", &numOne);
		printf("\nPlease enter another integer: ");
		scanf_s("%d", &numTwo);
		printf("\nNow, type the type of operation you want to perform (sum, diff, multi, div, remainder): ");
		scanf_s("%s", operation, 10);

		if (!(strcmp(operation, "sum")))
		{
			printf("\nSum of %d and %d is %d\n", numOne, numTwo, numOne + numTwo);
		}
		else if (!(strcmp(operation, "diff")))
		{
			printf("\nDifference between %d and %d is %d\n", numOne, numTwo, numOne - numTwo);
		}
		else if (!(strcmp(operation, "multi")))
		{
			printf("\nProduct of multiplying %d by %d is %d\n", numOne, numTwo, numOne * numTwo);
		}
		else if (!(strcmp(operation, "div")))
		{
			if (numTwo == 0)
			{
				printf("\nYou cannot DIVIDE by 0.\n");
			}
			else
			{
				printf("\nQuotient of dividing %d by %d is %d\n", numOne, numTwo, numOne / numTwo);
			}
		}
		else if (!(strcmp(operation, "remainder")))
		{
			printf("\nRemainder of dividing %d and %d is %d\n", numOne, numTwo, numOne % numTwo);
		}
		else
		{
			printf("\nPlease type a valid operation to perform.");
		}
	}
	return 0;
}