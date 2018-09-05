def main_loop():
    first_name = input("type in your first name, please: ");
    last_name = input("type in your last name, please: ");
    age = input("type in your age, please (type a number):");
    e_mail_list = input("Do you want to subscribe to our weekly newsletter (type true/false)?");
    name = "";

    print("");
    print("");
    print("");
    print("Final Results:");
    print("");
    if(first_name.isalpha()): name = name + first_name
    else: print("You haven't typed a valid Fisrt Name.");

    if(last_name.isalpha()): name = name + " " + last_name
    else: print("You haven't typed a valid Last Name.");

    if(first_name.isalpha() & last_name.isalpha()):print("Name:", name)

    if(age.isdigit()): print("Age: " + age)
    else: print("You haven't typed a valid age.");

    if(e_mail_list == "true"): print("You are now subscribed to our weekly newsletter.")
    elif(e_mail_list == "false"): print("You aren't subscribed to our weekly newsletter.")
    else: print("You haven't typed a valid value. You are not subscribed to our newsletter.");

    print("");
    print("");

while True:main_loop();
