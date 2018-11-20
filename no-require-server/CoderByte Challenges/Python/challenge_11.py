# KaprekarsConstant
# A program to compute how many sequence iterations it took to compue the Kaprekars Constant --> https://en.wikipedia.org/wiki/6174_(number)

def KaprekarsConstant(num):
    iteration_counter = 0;

    try:    
        if(len(str(num)) != 4):
            num = "Only 4-digit numbers are allowed!";
        else:
            while(num != 6174):
                final_num_list = []
                num_list_ascend = [];
                num_list_descend = [];

                for digit in str(num):
                   num_list_ascend.append(str(digit))
                   num_list_descend.append(str(digit))

                num_list_ascend = sorted(num_list_ascend)
                num_list_descend = sorted(num_list_descend, reverse = True);
                num_ascend = "".join(num_list_ascend)
                num_descend = "".join(num_list_descend)
                final_num_list = [int(num_ascend), int(num_descend)]
                num = max(final_num_list) - min(final_num_list)
                iteration_counter += 1;
            num = print("Number of Kaprekars Constant Sequence iterations:", iteration_counter);
        
    except ValueError:
            num = "Only 4-digit numbers are allowed!"
    return num;

while True:
    user_input = input("Please type a 4-digit number: ")
    KaprekarsConstant(user_input);
