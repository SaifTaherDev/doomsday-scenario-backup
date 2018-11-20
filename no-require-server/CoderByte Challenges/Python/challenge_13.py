#maximal_sqaure: calculates the area of the largest sub-matrix from a given matrix, where the sub-matrix contains ONLY 1's
def MaximalSquare(str_arr):
    max_len = min([len(str_arr), len(str_arr[0])])
    current_vertices = 0
    final_val = 0
    val_list = []
    for num in range(0, len(str_arr)):
        for num_two in range(0, len(str_arr[num])):
            for num_three in range(0, max_len):
                final_val = 0
                try:
                    current_vertices = str_arr[num][num_two] + str_arr[num + num_three][num_two + num_three]
                    for sequence in str_arr[num:num + num_three + 1]:
                        for num_four in sequence[num_two: num_two + num_three + 1]:
                            final_val += int(num_four)
                    if final_val == (num_three + 1)**2:
                        val_list.append(final_val)
                except IndexError:
                    continue
    return max(val_list)