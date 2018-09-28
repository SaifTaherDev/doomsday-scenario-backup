code_list = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
value_list = ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"]
use_string = ""
final_result = 0

def convertHex(string, newString, counter, result):
    string = string.upper()
    for char in string[::-1]:
        if char == "X":
            pass
        else:
            newString = value_list[code_list.index(char)] + newString
    while counter < len(newString):
        if newString[::-1][counter] == "1":
            result += (2 ** counter)
        else:
            pass
        counter += 1
    print(result)

while True:
    user_input = input("Type a hexadecimal string to convert it to decimal: ")
    try:
        convertHex(user_input, use_string, 0, final_result)
    except ValueError:
        print("Please type a valid hexadecimal code")