cheese_amount  = input("Please enter the amount of cheese you want to order (in kilograms): ");

try:
    if(float(cheese_amount) < 0.5):print("Sorry, we only deliver at least 0.5KG of cheese.")
    elif(float(cheese_amount) > 5.0):print("Sorry, we only deliver upto 5KG of cheese.")
    else:print("Thanks for purchasing from our company! Final price is: $" + str(float(cheese_amount)*2))
except ValueError:
    print("Please enter a valid amount (Integer/decimal)");

input("Press ENTER to exit the program!")

        