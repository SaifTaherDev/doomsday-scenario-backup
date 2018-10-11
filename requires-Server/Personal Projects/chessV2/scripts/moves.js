//determine moves
function determineSelected(xClick, yClick) {
    for (let piece of pieceArr) {
        if (xClick > piece.posX && xClick < piece.posX + piece.width) {
            if (yClick > piece.posY && yClick < piece.posY + piece.height) {
                selectedPiece = pieceArr.indexOf(piece)
            }
        }
    }
    for (let square of squareArr) {
        if (xClick > square.posX && xClick < square.posX + square.width) {
            if (yClick > square.posY && yClick < square.posY + square.height) {
                selectedSquare = square
            }
        }
    }
    for (let piece of pieceArr) {
        if (piece.posX == selectedSquare.posX) {
            if (piece.posY == selectedSquare.posY) {
                determineMoves(selectedSquare, pieceArr[selectedPiece])
            }
        }
    }
}

function rookMoves(squarePar, piecePar, player) {
    vertPositive = [];
    vertNegative = [];
    horizPositive = [];
    horizNegative = [];

    for (let square of squareArr) {
        if (square.row == squarePar.row) {
            if (square.col > squarePar.col) {
                horizPositive.push(square)
            } else if (square.col < squarePar.col) {
                horizNegative.unshift(square)
            }
        } else if (square.col == squarePar.col) {
            if (square.row > squarePar.row) {
                vertPositive.push(square)
            } else if (square.row < squarePar.row) {
                vertNegative.unshift(square)
            }
        }
    }
    for (let square of vertPositive) {
        if (square.hasPiece) {
            if (square.presentPiece.player == player) {
                square.clr = "blue"
            }
            break;
        } else {
            square.clr = "blue"
        }
    }
    for (let square of vertNegative) {
        if (square.hasPiece) {
            if (square.presentPiece.player == player) {
                square.clr = "blue"
            }
            break;
        } else {
            square.clr = "blue"
        }
    }
    for (let square of horizPositive) {
        if (square.hasPiece) {
            if (square.presentPiece.player == player) {
                square.clr = "blue"
            }
            break;
        } else {
            square.clr = "blue"
        }
    }
    for (let square of horizNegative) {
        if (square.hasPiece) {
            if (square.presentPiece.player == player) {
                square.clr = "blue"
            }
            break;
        } else {
            square.clr = "blue"
        }
    }
}

function knightMoves(squarePar, piecePar, player) {
    for (let square of squareArr) {
        if ((square.row == squarePar.row + 2 && square.col == squarePar.col + 1) || (square.row == squarePar.row - 2 && square.col == squarePar.col + 1) || (square.row == squarePar.row + 2 && square.col == squarePar.col - 1) || (square.row == squarePar.row - 2 && square.col == squarePar.col - 1)) {
            if (square.hasPiece) {
                if (square.presentPiece.player == player) {
                    square.clr = "blue"
                }
            } else {
                square.clr = "blue"
            }
        } else if ((square.col == squarePar.col + 2 && square.row == squarePar.row + 1) || (square.col == squarePar.col - 2 && square.row == squarePar.row + 1) || (square.col == squarePar.col + 2 && square.row == squarePar.row - 1) || (square.col == squarePar.col - 2 && square.row == squarePar.row - 1)) {
            if (square.hasPiece) {
                if (square.presentPiece.player == player) {
                    square.clr = "blue"
                }
            } else {
                square.clr = "blue"
            }
        }
    }
}

function bishopMoves(squarePar, piecePar, player) {
    diagonalBottomPositive = []
    diagonalBottomNegative = []
    diagonalTopPositive = []
    diagonalTopNegative = []
    for (forCounter = 1; forCounter < 8; forCounter++) {
        for (let square of squareArr) {
            if (square.row == squarePar.row + forCounter && square.col == squarePar.col + forCounter) {
                diagonalBottomPositive.push(square)
            } else if (square.row == squarePar.row + forCounter && square.col == squarePar.col - forCounter) {
                diagonalBottomNegative.push(square)
            } else if (square.row == squarePar.row - forCounter && square.col == squarePar.col + forCounter) {
                diagonalTopPositive.push(square)
            } else if (square.row == squarePar.row - forCounter && square.col == squarePar.col - forCounter) {
                diagonalTopNegative.push(square)
            }
        }
    }
    for (let square of diagonalBottomPositive) {
        if (square.hasPiece) {
            if (square.presentPiece.player == player) {
                square.clr = "blue"
            }
            break
        } else {
            square.clr = "blue"
        }
    }
    for (let square of diagonalBottomNegative) {
        if (square.hasPiece) {
            if (square.presentPiece.player == player) {
                square.clr = "blue"
            }
            break
        } else {
            square.clr = "blue"
        }
    }
    for (let square of diagonalTopPositive) {
        if (square.hasPiece) {
            if (square.presentPiece.player == player) {
                square.clr = "blue"
            }
            break
        } else {
            square.clr = "blue"
        }
    }
    for (let square of diagonalTopNegative) {
        if (square.hasPiece) {
            if (square.presentPiece.player == player) {
                square.clr = "blue"
            }
            break
        } else {
            square.clr = "blue"
        }
    }
}

function queenMoves(squarePar, piecePar, player) {
    rookMoves(squarePar, piecePar, player)
    bishopMoves(squarePar, piecePar, player)
}

function kingMoves(squarePar, piecePar, player) {
    for (let square of squareArr) {
        if (square.row == squarePar.row && (square.col == squarePar.col + 1 || square.col == squarePar.col - 1)) {
            if (square.hasPiece) {
                if (square.presentPiece.player == player) {
                    square.clr = "blue"
                }
            } else {
                square.clr = "blue"
            }
        } else if (square.col == squarePar.col && (square.row == squarePar.row + 1 || square.row == squarePar.row - 1)) {
            if (square.hasPiece) {
                if (square.presentPiece.player == player) {
                    square.clr = "blue"
                }
            } else {
                square.clr = "blue"
            }
        } else if ((square.row == squarePar.row + 1 || square.row == squarePar.row - 1) && (square.col == squarePar.col + 1 || square.col == squarePar.col - 1)) {
            if (square.hasPiece) {
                if (square.presentPiece.player == player) {
                    square.clr = "blue"
                }
            } else {
                square.clr = "blue"
            }
        }
        if (piecePar.player == "playerOne") {
            if (possibleMovesPlayerTwo.includes(square)) {
                square.clr = square.originClr
            }
            for (let square of squareArr) {
                if (square.row == kingPlayerTwo.row + 1 || square.row == kingPlayerTwo.row - 1) {
                    if (square.col == kingPlayerTwo.col || square.col == kingPlayerTwo.col + 1 || square.col == kingPlayerTwo.col - 1) {
                        square.clr = square.originClr
                    }
                } else if (square.row == kingPlayerTwo.row) {
                    if (square.col == kingPlayerTwo.col + 1 || square.col == kingPlayerTwo.col - 1) {
                        square.clr = square.originClr
                    }
                }
            }
        } else {
            if (possibleMovesPlayerOne.includes(square)) {
                square.clr = square.originClr
            }
            for (let square of squareArr) {
                if (square.row == kingPlayerOne.row + 1 || square.row == kingPlayerOne.row - 1) {
                    if (square.col == kingPlayerOne.col || square.col == kingPlayerOne.col + 1 || square.col == kingPlayerOne.col - 1) {
                        square.clr = square.originClr
                    }
                } else if (square.row == kingPlayerOne.row) {
                    if (square.col == kingPlayerOne.col + 1 || square.col == kingPlayerOne.col - 1) {
                        square.clr = square.originClr
                    }
                }
            }
        }
    }
}

function pawnMoves(squarePar, piecePar, player, moveUpDown) {
    for (let square of squareArr) {
        if (square.col == squarePar.col) {
            if (square.row == squarePar.row + moveUpDown) {
                if (square.hasPiece) {
                    square.clr = square.originClr
                    pawnTwoMovesBool = false
                } else {
                    square.clr = "blue"
                    pawnTwoMovesBool = true
                }
            } else if (piecePar.posX == piecePar.originPosX && piecePar.posY == piecePar.originPosY) {
                if (square.row == squarePar.row + (moveUpDown * 2) && pawnTwoMovesBool == true) {
                    if (square.hasPiece) {
                        square.clr = square.originClr
                    } else {
                        square.clr = "blue"
                    }
                }
            }
        } else if (square.col == squarePar.col + 1 || square.col == squarePar.col - 1) {
            if (square.row == squarePar.row + moveUpDown) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == player) {
                        square.clr = square.originClr
                    } else {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = square.originClr
                }
            }
        }
    }
}
function determineMoves(squarePar, piecePar) {
    for (let square of squareArr) {
        square.clr = square.originClr
    }
    if (piecePar.player == "playerOne") {
        if (playerCounter % 2 == 0) {
            switch (piecePar.name) {
                case "rook":
                    rookMoves(squarePar, piecePar, "playerTwo")
                    break;
                case "knight":
                    knightMoves(squarePar, piecePar, "playerTwo")
                    break;
                case "bishop":
                    bishopMoves(squarePar, piecePar, "playerTwo")
                    break;
                case "queen":
                    queenMoves(squarePar, piecePar, "playerTwo")
                    break;
                case "king":
                    kingMoves(squarePar, piecePar, "playerTwo")
                    break;
                case "pawn":
                    pawnMoves(squarePar, piecePar, "playerOne", 1)
                    break;
            }
        }
    } else {
        if (playerCounter % 2 != 0) {
            switch (piecePar.name) {
                case "rook":
                    rookMoves(squarePar, piecePar, "playerOne")
                    break;
                case "knight":
                    knightMoves(squarePar, piecePar, "playerOne")
                    break;
                case "bishop":
                    bishopMoves(squarePar, piecePar, "playerOne")
                    break;
                case "queen":
                    queenMoves(squarePar, piecePar, "playerOne")
                    break;
                case "king":
                    kingMoves(squarePar, piecePar, "playerOne")
                    break;
                case "pawn":
                    pawnMoves(squarePar, piecePar, "playerTwo", -1)
                    break;
            }
        }
    }
}