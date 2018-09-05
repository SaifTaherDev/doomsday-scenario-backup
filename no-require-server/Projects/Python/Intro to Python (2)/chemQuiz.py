correct_elements = ["hydrogen", "helium", "lethium", "beryllium", "boron", "carbon", "nitrogen", "oxygen", "fluorine", "neon", "sodium", "magnesium", "alumnim", "silicon", "chlorine", "argon", "potassium", "calcium"];

def grader_function(user_answer):
    
    user_correct_answer_list = [];
    user_false_answer_list = [];
    correct_list_counter = 0
    false_list_counter = 0
    questions_counter = 0;
    
    while questions_counter < 4: 
        
        user_answer = input("Type any of the 20 first chemical elements in the periodic table: ");

        if(user_answer.lower() in user_correct_answer_list):
            print(user_answer, "was already entered.")
        elif(user_answer.lower() in correct_elements):
                user_correct_answer_list.append(user_answer.lower());
        else:
            user_false_answer_list.append(user_answer.lower())
        
        questions_counter += 1

    for element in user_correct_answer_list:
        user_correct_answer_list[correct_list_counter] = element.title();
        correct_list_counter += 1;

    for element in user_false_answer_list:
        user_false_answer_list[false_list_counter] = element.title();
        false_list_counter += 1;

    return print("\n\n Final Results:\n total grade:", str(len(user_correct_answer_list)*20) + "%\n", "Correct answers:", ", ".join(user_correct_answer_list),"\n False answers:", ", ".join(user_false_answer_list))


while True:
    user_input = input("Type any of the 20 first chemical elements in the periodic table: ");
    grader_function(user_input);
