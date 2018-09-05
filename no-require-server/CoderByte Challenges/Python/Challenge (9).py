# timerConvert
# takes number of minutes and returns the time in hour:minute form

def TimeConvert(num):
    try:
        num = (str(int((int(num) - int(num) % 60) / 60)) + ":" + str(int(num) % 60))
    except ValueError:
        num = "please enter a number!"
    return num
while True:
    user_input = input("Please type the number of minutes: ")
    print(TimeConvert(user_input))
