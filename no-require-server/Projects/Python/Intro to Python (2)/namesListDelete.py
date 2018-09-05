names_list =["Obama", "James", "Jackson", "Thomas", "Reiner", "Eren"]
print("Here's a random list of names, cuz why the fuck not:\n")

def delete_name(index_num):
    del names_list[index_num]
    print("")

while True:
    if(names_list == []):print("The list is now empty, bro!")
    else:print(names_list);

    user_index = input("Type the index of the name: \n");

    try:
       int(user_index)
       if(int(user_index) > (len(names_list)-1)):
           print("Please type a number less than", str(len(names_list)) + "!\n")
       elif(int(user_index) < 0):print("Please type a postitive number!")
       else: delete_name(int(user_index));
    except ValueError:
       print("\n Please type a number!\n");
    

