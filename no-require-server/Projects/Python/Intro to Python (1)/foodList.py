def main_loop():
    foodList = "Pizza, Burger, Spaghetti, Pasta, Meat, Steak";
    foodOrder = input("Please enter the name of a meal you would like: ")

    if(foodOrder.lower() in foodList.lower()):print("Luck you! We do serve the meal you want:", foodOrder.lower())
    else:print("Sorry! We don't serve the meal you want:", foodOrder.lower())

    print("")
    print("")

while True: main_loop();