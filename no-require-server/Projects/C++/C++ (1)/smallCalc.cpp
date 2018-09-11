#include "stdafx.h"
#include <iostream>

using namespace std;

double numOne;
double numTwo;
short int operation;

int calc(double doubleOne, double doubleTwo, short int operationName) {
	if (operationName == 1) {
		cout << "adding " << doubleOne << " to " << doubleTwo << " results in " << doubleOne + doubleTwo << endl;
	}
	else if (operationName == 2) {
		cout << "subtracting " << doubleTwo << " from " << doubleOne << " results in " << doubleOne - doubleTwo << endl;
	}
	else if (operationName == 3) {
		cout << "multiplying " << doubleOne << " by " << doubleTwo << " results in " << doubleOne * doubleTwo << endl;
	}
	else if (operationName == 4) {
		cout << "dividing " << doubleOne << " by " << doubleTwo << " results in " << doubleOne / doubleTwo << endl;
	}
	else if (operationName == 5) {
		long int expMulti = doubleOne;
		for (unsigned short int expCount = 0; expCount < doubleTwo - 1; expCount++) {
			doubleOne *= expMulti;
		}
		cout << "raising " << expMulti << " to " << doubleTwo << " results in " << doubleOne << endl;
	}
	else {
		cout << "Please type a valid operation name." << endl;
	}
	return 0;
}

int main() {
	while (1) {
		cout << "\nPlease type a number: ";
		cin >> numOne;
		cout << endl;
		cout << "Please type a number: ";
		cin >> numTwo;
		cout << endl;
		cout << "Please type the operation you want to perform from 1 to 5 (add, sub, multi, div, exponent): ";
		cin >> operation;
		cout << endl;

		numOne = double(numOne);
		numTwo = double(numTwo);
		calc(numOne, numTwo, operation);
	}
}