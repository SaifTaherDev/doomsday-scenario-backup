# biggestWord
# A small application to extract the largest word from a given sentence

def LongestWord(sen):
    if (sen != ""):    
        sen_len_list = [];
        letter_counter = 0;
        word_counter = 0;

        sen = list(sen);

        for letter in sen:
            if (letter.isalpha()):
                sen[letter_counter] = letter.lower();
            elif (letter.isdigit()):
                sen[letter_counter] = letter;
            elif(letter == ' '):
                sen[letter_counter] = letter;
            else:
                sen[letter_counter] = "";
            letter_counter += 1;
    
        sen = "".join(sen);
   
        sen_list = sen.split();

        for word in sen_list:
            sen_len_list.append(int(len(word)));

        max_len = max(sen_len_list);

        for word in sen_list:
            if (int(len(word)) == max_len):
                sen = word
                break;

        return sen;
    else:print("Please enter something!")

while True:
    user_input = input("Type any sentence to extract the longest word: ");
    print(LongestWord(user_input));