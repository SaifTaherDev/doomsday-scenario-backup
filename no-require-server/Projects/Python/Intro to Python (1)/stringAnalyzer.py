def str_analysis(string):

    while (string.isalpha() == False) and (string.isdigit() == False) and (string.isalnum() == False):
        string = input("Type a valid word or an integer: ");

    if(string.isalpha()): print("You've typed a word!")
    elif(string.isdigit()):
        if(int(string) > 99):print("You've typed a big integer!")
        elif(int(string) <= 99):print("You've typed a small integer!")
    elif(string.isalnum()):print("You've typed a mix of letters and numbers!")
    else:print("Please enter a valid value!");

while True:
    input_str = input("Type a valid word or an integer: ");
    str_analysis(input_str);

