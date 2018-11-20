# additionFactorial
# add all numbers up to a specific number

def SimpleAdding(num):
    if(num.isdigit()):
        total = 0
        for number in range(1, int(num) + 1):
            total += number
        num = total
    else:
        num = "Please type a number!"
    return num

while True:
    user_input = input("Type any number to get its \"addition factorial\": ")
    print(SimpleAdding(user_input));