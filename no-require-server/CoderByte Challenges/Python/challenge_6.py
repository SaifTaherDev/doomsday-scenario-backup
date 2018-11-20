# wordCapitalize
# capitalizes the first letter of every word

def LetterCapitalize(str): 
    str_list = str.split();
    counter = 0;
    for word in str_list:
        str_list[counter] = word.capitalize()
        counter += 1;
    str = " ".join(str_list)
    return str
    
while True:
    user_input = input("Type any sentence to capitalize the first letter of each word: ")
    print(LetterCapitalize(user_input));
