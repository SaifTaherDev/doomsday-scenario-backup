while True:
    word = "";
    example_sentence = input("Type any sentence:")
    sentence_for_code = example_sentence + "5";
    for letter in sentence_for_code:
        if(letter.isalpha()):
            word += letter
        else:
            if(word[0].lower() > "g"):
                print(word);
                word = ""
