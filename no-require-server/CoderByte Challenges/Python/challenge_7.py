# simpleSymbols
# analyzes sentences and requuires to be at least one letter, that every letter is sandwiched between 2 plus signs,  that the string cannot be empty, and the string can only consists of spaces, + signs, = signs, letters, and digits
def SimpleSymbols(str):
    char_counter = 0;
    str_list = list(str);
    if(str != ""):
        for char in str_list:
            if(str_list[0].isalpha()):
                str = False;
            elif(char.isalpha()):
                char_counter += 1;
                try:
                    if(str_list[int(str_list.index(char) + 1)] == '+'):
                        if(str_list[int(str_list.index(char) - 1)] == '+'):
                            str = True;
                        else: str = False
                    else: str = False
                except IndexError:
                    str = False
            elif(char in ['+', '=', ' ']):
                pass;
            else:
                if(char.isdigit()): pass;
                else: str = False;
        if(char_counter == 0):
            str = False;
    else: str = False;
    return str
while True:
    user_input = input("Type the sntence to verify it: ")
    print(SimpleSymbols(user_input))
