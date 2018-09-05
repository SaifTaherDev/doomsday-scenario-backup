#include "stdafx.h"
#include <iostream>
#include <string>
using namespace std;

int main()
{
	cout << "Please enter the prices of all the items you've bought: Type '0' to compute and display the total along with the price of each item: \n";
	short int total[] = { 0 };
	short int totalValue = 0;
	short int userInput = 1;
	short int counter = 0;
	while (userInput != 0)
	{
		cin >> userInput;
		total[counter] = userInput;
		counter++;
		totalValue += userInput;
	}
	for (short int listCounter = 0; listCounter < sizeof(total) + 2; listCounter++)
	{
		cout << "item " << listCounter + 1 << ": " << total[listCounter] << endl;
	}
	cout << totalValue << endl;
}