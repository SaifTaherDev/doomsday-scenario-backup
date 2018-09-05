def word_mixer(words_list_par):
    
    sorted(words_list_par);
    new_list = [];

    while len(words_list_par) > 5:
        fifth_from_end = words_list_par.pop((len(words_list_par) - 6))
        new_list.append(fifth_from_end)
        first = words_list_par.pop(0)
        new_list.append(first)
        last = words_list_par.pop((len(words_list_par) - 1))
        new_list.append(last)
    
    final_string = " ".join(new_list)
    return print(final_string);



while True:
    user_input = input("Please type a poem, a famous quote, or anything equivilent: ");
    words_list = user_input.split();
    list_length = len(words_list);

    for number in range(list_length):
        if(len(words_list[number]) <= 3):
            words_list[number] = words_list[number].lower();
        elif(len(words_list[number]) >= 7):
            words_list[number] = words_list[number].upper();
        else:pass;

    word_mixer(words_list)

    
