languages_list = ["JavaScript", "jQuery", "HTML", "CSS", "Python", "Objective-C", "C#", "C++", "C", "PHP", "SQL"]

def modify_list_func(items_list):
    if(items_list == []):print("The list is empty!\n\n Press ENTER to exit the program!");input();exit();
    elif(user_input in items_list):items_list.remove(user_input)
    elif(user_input == ""):items_list.pop();
    elif(user_input.lower() == "quit"):exit();
    elif((user_input in items_list) == False):items_list.append(user_input)
    
    return print(languages_list);


print("Here's a list of some programming/web development languages: \n")
print("type something to modify the list of languages accordingly: \n\n")

for language in languages_list:
    print(language);

while True:
    user_input = input("Type something: ")
    modify_list_func(languages_list)