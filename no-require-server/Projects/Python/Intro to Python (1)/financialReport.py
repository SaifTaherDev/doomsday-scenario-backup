def report_func(total_value, items_list):
    while True:

        user_input = input("Type a number or Q:")
        if(user_input.isdigit()):
            total_value = total_value + int(user_input);
            items_list.append(user_input)

        elif(user_input.isalpha()):
            if(user_input.lower() == "q"):
                print("\n \n items: \n")
                for x in items:print(x)
                print("\n\n total: \n", total_value)
                input();
                break
               
            else:print("Please enter a number or Q")

        elif(user_input.isalnum()):print("Please enter a number or Q")

        else:print("Please enter a number or Q")

print("Please type an integer or a decimal number to represent the value of an item OR alternatively type Q to calculate the grand total: \n\n");

items = [];
total = 0;

report_func(total, items);
