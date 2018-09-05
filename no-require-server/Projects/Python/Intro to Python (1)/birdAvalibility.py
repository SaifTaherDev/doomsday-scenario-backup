bird_list_male = ["Charlie", "Angel", "Max", "Chuck", "Red", "Skittles", "Bogart", "Indy", "Jet", "Shadow"]
bird_list_female = ["Stella", "Matilda", "Coco", "Sunny", "Willow", "Baby", "Dalia", "Kiwi", "Gale", "Cleo"]

def print_bird_list(print_stmt,birdList):
    iterator = 0;

    while(iterator < 10):
        print_stmt = print_stmt + birdList[iterator] + ", "
        iterator = iterator + 1
        if(iterator == 9): print_stmt = print_stmt + birdList[9] + "."; break

    print(print_stmt)
    print("");

print_bird_list("Male: ", bird_list_male);
print_bird_list("Female: ", bird_list_female);

bird_male_list_for_search = ([x.lower()for x in bird_list_male]);
bird_female_list_for_search = ([x.lower()for x in bird_list_female]);

while True:
    print("");
    
    unavailable = "Sorry, but this bird isn't avalible for purchase!";
    available = "Congratulations! This bird is avalible for purchase!";

    bird_name = input("Type in the name of any bird from our list to check for its avalibility:")
    print("");

    if(bird_name.lower() in bird_male_list_for_search or bird_name.lower() in bird_female_list_for_search):
        if(bird_name.lower() == (bird_male_list_for_search[0] or bird_male_list_for_search[4] or bird_male_list_for_search[9])):print(unavailable);
        elif(bird_name.lower() == (bird_male_list_for_search[3] or bird_male_list_for_search[6] or bird_male_list_for_search[7])):print(unavailable);
        else:print(available);
    else:print("This bird is not on the list!");

