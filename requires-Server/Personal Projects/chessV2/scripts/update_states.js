function updateStates() {
    for (let square of squareArr) {
        for (let piece of pieceArr) {
            if (piece.posX == square.posX && piece.posY == square.posY) {
                square.hasPiece = true
                square.presentPiece = piece
                break
            } else {
                square.hasPiece = false
                square.presentPiece = null
            }
        }
    }
}
function updatePawn(squarePar, killNum, arr) {
    for (let square of squareArr) {
        if (square.row == squarePar.row + killNum) {
            if (square.col == squarePar.col - 1 || square.col == squarePar.col + 1) {
                if (arr.includes(square) == false) {
                    arr.push(square)
                }
            }
        }
    }
}

function updateRook(squarePar, arr) {
    vertPositiveUpdate = [];
    vertNegativeUpdate = [];
    horizPositiveUpdate = [];
    horizNegativeUpdate = [];

    for (let square of squareArr) {
        if (square.row == squarePar.row) {
            if (square.col > squarePar.col) {
                horizPositiveUpdate.push(square)
            } else if (square.col < squarePar.col) {
                horizNegativeUpdate.unshift(square)
            }
        } else if (square.col == squarePar.col) {
            if (square.row > squarePar.row) {
                vertPositiveUpdate.push(square)
            } else if (square.row < squarePar.row) {
                vertNegativeUpdate.unshift(square)
            }
        }
    }
    for (let square of vertPositiveUpdate) {
        if (square.hasPiece) {
            arr.push(square)
            break;
        } else {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
        }
    }
    for (let square of vertNegativeUpdate) {
        if (square.hasPiece) {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
            break;
        } else {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
        }
    }
    for (let square of horizPositiveUpdate) {
        if (square.hasPiece) {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
            break;
        } else {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
        }
    }
    for (let square of horizNegativeUpdate) {
        if (square.hasPiece) {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
            break;
        } else {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
        }
    }
}

function updateBishop(squarePar, arr) {
    diagonalTopPositiveUpdate = []
    diagonalTopNegativeUpdate = []
    diagonalBottomPositiveUpdate = []
    diagonalBottomNegativeUpdate = []
    for (forCounter = 1; forCounter < 8; forCounter++) {
        for (let square of squareArr) {
            if (square.row == squarePar.row + forCounter && square.col == squarePar.col + forCounter) {
                diagonalTopPositiveUpdate.push(square)
            } else if (square.row == squarePar.row + forCounter && square.col == squarePar.col - forCounter) {
                diagonalTopNegativeUpdate.push(square)
            } else if (square.row == squarePar.row - forCounter && square.col == squarePar.col + forCounter) {
                diagonalBottomPositiveUpdate.push(square)
            } else if (square.row == squarePar.row - forCounter && square.col == squarePar.col - forCounter) {
                diagonalBottomNegativeUpdate.push(square)
            }
        }
    }
    for (let square of diagonalTopPositiveUpdate) {
        if (square.hasPiece) {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
            break
        } else {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
        }
    }
    for (let square of diagonalTopNegativeUpdate) {
        if (square.hasPiece) {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
            break
        } else {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
        }
    }
    for (let square of diagonalBottomPositiveUpdate) {
        if (square.hasPiece) {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
            break
        } else {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
        }
    }
    for (let square of diagonalBottomNegativeUpdate) {
        if (square.hasPiece) {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
            break
        } else {
            if (arr.includes(square) == false) {
                arr.push(square)
            }
        }
    }
}

function updateKnight(squarePar, arr) {
    for (let square of squareArr) {
        if ((square.row == squarePar.row + 2 && square.col == squarePar.col + 1) || (square.row == squarePar.row - 2 && square.col == squarePar.col + 1) || (square.row == squarePar.row + 2 && square.col == squarePar.col - 1) || (square.row == squarePar.row - 2 && square.col == squarePar.col - 1)) {
            if (square.hasPiece) {
                if (arr.includes(square) == false) {
                    arr.push(square)
                }
            } else {
                if (arr.includes(square) == false) {
                    arr.push(square)
                }
            }
        } else if ((square.col == squarePar.col + 2 && square.row == squarePar.row + 1) || (square.col == squarePar.col - 2 && square.row == squarePar.row + 1) || (square.col == squarePar.col + 2 && square.row == squarePar.row - 1) || (square.col == squarePar.col - 2 && square.row == squarePar.row - 1)) {
            if (square.hasPiece) {
                if (arr.includes(square) == false) {
                    arr.push(square)
                }
            } else {
                if (arr.includes(square) == false) {
                    arr.push(square)
                }
            }
        }
    }
}

function updateQueen(squarePar, arr) {
    updateBishop(squarePar, arr)
    updateRook(squarePar, arr)
}
