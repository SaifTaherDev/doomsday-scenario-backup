def ChessboardTraveling(pos_str):
    pos_tuple = (int(pos_str[1]), int(pos_str[3]), int(pos_str[6]), int(pos_str[8]))
    (pos_x_one, pos_y_one, pos_x_two, pos_y_two) = pos_tuple
    combination_counter = 0
    x_counter = 0
    y_counter = 0
    x_limit = pos_x_two - pos_x_one
    y_limit = pos_y_two - pos_y_one
    for num in range(1, x_limit + 1):
        x_counter = num
        while x_counter <= x_limit:
            x_counter += 1
            if y_counter <= y_limit:
                y_counter += 1
            print("(" + str(x_counter) + "," , str(y_counter) + ")")
        combination_counter += 1

    for num in range(1, y_limit + 1):
        y_counter = num
        while y_counter <= y_limit:
            y_counter += 1
            if x_counter <= x_limit:
                x_counter += 1
            print("(" + str(x_counter) + "," , str(y_counter) + ")")
        combination_counter += 1

    return combination_counter


    
print(ChessboardTraveling("(1 1)(3 3)"))
input("press ENTER to exit the program")