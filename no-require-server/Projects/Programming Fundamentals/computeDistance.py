def computeDist(compare, set):
    from math import sqrt;
    alert = "";
    counter = 0;

    comparePoints = [];
    xPoints = [];
    yPoints = [];
    xResults = [];
    yResults = [];
    finalResults = [];

    try:
        if(compare[counter] == "("):
            alert = "";
            counter += 1;
            if(compare[counter].isdigit()):
                alert = "";
                comparePoints.append(compare[counter]);
                counter += 1;
                if(compare[counter] == ","):
                    alert = "";
                    counter += 1;
                    if(compare[counter].isdigit()):
                        alert = "";
                        comparePoints.append(compare[counter]);
                        counter += 1;
                        if(compare[counter] == ")"):
                            pass;
                        else: alert = "Please type a valid compare-against point,";
                    else: alert = "Please type a valid compare-against point,";
                else: alert = "Please type a valid compare-against point,";
            else: alert = "Please type a valid compare-against point,";
        else: alert = "Please type a valid compare-against point,";
    except IndexError:
        alert = "Please type a valid compare-against point INDEX,";
    
    if(len(compare) > 5):
        alert = "Please type a valid compare-against point,";

    print(alert + "\n");

    counter = 0;
    try:
        while(counter < len(set)):
            if(set[counter] == "("):
                alert = "";
                counter += 1;
                if(set[counter].isdigit()):
                    alert = "";
                    xPoints.append(set[counter]);
                    counter += 1;
                    if(set[counter] == ","):
                        counter += 1;
                        alert = "";
                        if(set[counter].isdigit()):
                            alert = "";
                            yPoints.append(set[counter]);
                            counter += 1;
                            if(set[counter] == ")"):counter += 1;
                            else: 
                                alert = "Please type a valid set of points,";
                                break;
                        else: 
                            alert = "Please type a valid set of points,";
                            break;
                    else: 
                        alert = "Please type a valid set of points,";
                        break;
                else:
                    alert = "Please type a valid set of points,";
                    break;
            else:
               alert = "Please type a valid set of points,";
               break;
    except IndexError:
        alert = "Please type a valid set of points INDEX,";
    
    print(alert + "\n");

    if(alert in ["Please type a valid set of points,", "Please type a valid compare-against point,"]):
        pass;
    else:
        counter = 0;

        while(counter < len(xPoints)):
            xResults.append(abs(int(comparePoints[0]) - int(xPoints[counter])));
            yResults.append(abs(int(comparePoints[1]) - int(yPoints[counter])));
            finalResults.append(round(sqrt(xResults[counter]**2 + yResults[counter]**2), 2));
            counter += 1;

        print("closest point is: (" + xPoints[finalResults.index(min(finalResults))] + "," + yPoints[finalResults.index(min(finalResults))] + ")",)
        
print("Please type a string of points to compare against,\n\n");
print("And a string of points to compare against the original point (don't include any whitespace: only type the x and y coordinates of the point, seperated by a coma and surrounded by two brackets: '(' and ')', don't type anything between each POINT): \n\n\n");
while True:
    comparePoint = input("Please type the Compare-Against Point:\n ");
    pointsSet = input("Please type the set of points:\n ");
    computeDist(comparePoint, pointsSet);