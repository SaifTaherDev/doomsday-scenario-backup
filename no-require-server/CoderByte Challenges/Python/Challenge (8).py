# CheckNums
# compare 2 numbers and determine hwich is greater

def CheckNums(num1,num2): 
    try:
        float(num1);
        float(num2);
        if(float(num1) > float(num2)):
            num1 = True
        elif(float(num2) > float(num1)):
            num1 = False
        elif(float(num1) == float(num2)):
            num1 = -1
    except ValueError:
        print("Only numbers are allowed!")
    return num1
while True:
    user_input_one = input("Please type a number: ")
    user_input_two = input("Please type a number: ")
    print(CheckNums(user_input_one, user_input_two))
