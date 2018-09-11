#functions & variables definitions
from math import sqrt;
x_input = "";
y_input = "";
compare_input_X = "";
compare_input_Y = "";

xPoints = [];
yPoints = [];
xResults = [];
yResults = [];
finalResults = [];

def requestInput():
    x_input = input("\nPlease type an X-value: ");
    y_input = input("Please type a Y-value: ");
    initializeFlow(x_input, y_input);

def initializeFlow(x_num, y_num):
    if(x_num.isdigit() and y_num.isdigit()):
        xPoints.append(int(x_num));
        yPoints.append(int(y_num));
    elif(x_num.lower() == "compare" or y_num.lower() == "compare"):
        compare_input_X = input("\nPlease type the X value of the point you want to compare against: ")
        compare_input_Y = input("Please type the Y value of the point you want to compare against: ")
        if(compare_input_X.isdigit() and compare_input_Y.isdigit()):
            constructXYLists(compare_input_X, compare_input_Y)
        else:
            print("Please type a number");
    else:
        print("\nPlease type a valid x/y value");

def constructXYLists(x_num, y_num):
    for num in xPoints:
        xResults.append(abs(int(x_num) - num));
    for num in yPoints:
        yResults.append(abs(int(y_num) - num));
    computeDist();

def computeDist():
    counter = 0;
    while (counter < len(xResults)):
        finalResults.append(sqrt((xResults[counter]*xResults[counter])+(yResults[counter]*yResults[counter])))
        counter += 1;
    xValueFinal = xPoints[finalResults.index(min(finalResults))];
    yValueFinal = yPoints[finalResults.index(min(finalResults))];
    print("\nclosest point is: (" + str(xValueFinal) + ", " + str(yValueFinal) + ")");

#start of program flow
while True:
    requestInput();