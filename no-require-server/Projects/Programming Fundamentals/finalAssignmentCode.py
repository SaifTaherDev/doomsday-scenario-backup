def sortSequence(numList):

    unsortedSequence = numList;
    sortedSequence = [];
    original_len = len(unsortedSequence);
    counter = 0;
    while(counter < original_len):
        smallest = unsortedSequence[0];
        for num in unsortedSequence:
            if(num < smallest):
                smallest = num;
            else:pass;
        unsortedSequence.remove(smallest)
        sortedSequence.append(smallest);
        counter += 1;
    return print("Sorted list is:", sortedSequence);
    
user_list = [];
user_io = print("Please type a number to add to the list you wish to sort or type \"sort\" to return the sorted list.\n");

while True:
    while(user_io != "sort"):
        user_io = input("Please type an integer or \"sort\": ")
        if(user_io.isdigit()):
            user_list.append(int(user_io))
        elif(user_io.lower() == "sort"):
            pass;
        else:
            print("Only integers are allowed.")
    sortSequence(user_list)
    user_io = print("Please type a number to add to the list you wish to sort or type \"sort\" to return the sorted list.\n");





