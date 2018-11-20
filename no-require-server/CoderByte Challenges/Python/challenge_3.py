# reverseString
# an application to reverse a given string (apple --> elppa);

def FirstReverse(str):
    letter_list = [];
    for letter in str:
        letter_list.append(letter);
    letter_list = reversed(letter_list);
    str = "".join(letter_list);
    return str

while True:
    user_input = input("Type a string to get it back reversed: ")
    print(FirstReverse(user_input));

