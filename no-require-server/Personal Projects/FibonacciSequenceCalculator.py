fibanocci_list = [0,1]
fibanocci_counter_one = 0;
fibanocci_counter_two = 1;
fibanocci_total = 0;

print("INSTRUCTIONS: Press ENTER after each number is printed to compute the following number.\n\n\n")
for number in fibanocci_list:
    print(number);
    input();

while True:
    fibanocci_total = fibanocci_list[fibanocci_counter_one] + fibanocci_list[fibanocci_counter_two]
    print(fibanocci_total);
    fibanocci_list.append(fibanocci_total)
    fibanocci_counter_one += 1;
    fibanocci_counter_two += 1;
    input();