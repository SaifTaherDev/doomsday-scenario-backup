names_list =["Obama", "James", "Jackson", "Thomas", "Reiner", "Eren"]
print("Here's a random list of names, cuz why the fuck not:\n")

def edit_name(index_num, edited_value):
    names_list[index_num] = edited_value
    print("")

while True:
    print(names_list);
    user_index = input("Type the index of the name: \n");
    user_edit = input("Type the new value of the name: \n");

    try:
       int(user_index)
       if(int(user_index) > 5):
           print("Please type a number less than 5!\n")
       else: edit_name(int(user_index), user_edit);
    except ValueError:
       print("\n Please type a number!\n");
    
