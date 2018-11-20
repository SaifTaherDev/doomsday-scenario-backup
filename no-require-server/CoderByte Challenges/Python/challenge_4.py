# strManipulator
# manipulate letters in strings according to their position in alphabet and their case
def LetterChanges(str):
    firstCounter = 0;
    secondCounter = 0;
    thridCounter = 0;
    str = list(str);
    for letter in str:
        if(letter.isalpha()):
            if(letter.lower() != 'z'):
                str[firstCounter] = chr(ord(letter) + 1).lower();
            else: str[firstCounter] = 'a';
        else:pass;
        firstCounter += 1;
    str = "".join(str);
    str = list(str);
    for letter in str:
       if(letter.lower() in ['a', 'e', 'i', 'o', 'u']):
            str[secondCounter] = letter.upper();
       secondCounter += 1;
    str = "".join(str);
    return str

while True:
    user_input = input("Type any string to mess the shit out of it: ")
    print(LetterChanges(user_input));
