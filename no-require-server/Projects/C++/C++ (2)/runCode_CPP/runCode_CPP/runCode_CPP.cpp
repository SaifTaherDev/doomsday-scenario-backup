#include "stdafx.h"
#include <iostream>

using namespace std;

int main() {
	int num = 3;
	int* numLocation = &num;
	int &numAlias = num;
	cout << *numLocation << endl;
	cout << numAlias << endl;
	return 0;
}