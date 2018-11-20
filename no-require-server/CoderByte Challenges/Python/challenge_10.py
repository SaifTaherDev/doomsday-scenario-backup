# alphabetSoup
# takes strings, return only letters in the correct alphabetical order

def AlphabetSoup(str): 
    str_list = list(str);
    len_list = [];
    for char in str_list:
        if(char.isalpha()):
            len_list.append(ord(char));
        len_list = sorted(len_list);
        str_list = [];
        for len in len_list:
            str_list.append(chr(len));
        str = "".join(str_list);
    return str

while True:
    user_input = input("Type the string to order: ")
    print(AlphabetSoup(user_input));