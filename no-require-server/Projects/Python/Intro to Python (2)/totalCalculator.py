input_num = input("Type a number or 'total': ");
total_list = [];
total = 0;

while (input_num.lower() != 'total'):
    try: 
        float(input_num)
        total_list.append(float(input_num))
        input_num = input("Type a number or 'total': ");
    except:
        print("error!")
        input_num = input("Type a number or 'total': ");
for item in total_list:
    total += item;
print('total:', total)
input();
