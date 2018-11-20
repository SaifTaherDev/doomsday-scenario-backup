# calcFactorial
# An application to calculate the factorial of a given number

def FirstFactorial(num): 
    for number in range(1, num):
        num *= number
    return str(num)

while True:
    user_input = input("Type any number to get its factorial: ");
    print(FirstFactorial(int(user_input)));


