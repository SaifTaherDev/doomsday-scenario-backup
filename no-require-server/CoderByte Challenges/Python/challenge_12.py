#Chess Board Travelling: Determines how many possible ways are there to travel
#from a certain square on a chess board to another square using the Binomial Theorem
def ChessboardTraveling(str): 
    pos_x_one = int(str[1])
    pos_x_two = int(str[6])
    pos_y_one = int(str[3])
    pos_y_two = int(str[8])
    n = (pos_x_two - pos_x_one) + (pos_y_two - pos_y_one)
    k = pos_y_two - pos_y_one
    n_factorial = 1
    k_factorial = 1
    nk_factorial = 1
    for num in range(1, n + 1):
        n_factorial *= num
    for num in range(1, k + 1):
        k_factorial *= num
    for num in range(1, n - k + 1):
        nk_factorial *= num
    return n_factorial / (k_factorial * nk_factorial)
