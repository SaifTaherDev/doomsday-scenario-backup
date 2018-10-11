//do the castle move
function determinePlayerKingCastle() {
    if (playerCounter % 2 == 0) {
        if (squareArr[4].presentPiece != null && squareArr[7].presentPiece != null) {
            kingCastle(kingPlayerOne, squareArr[4].presentPiece, squareArr[7].presentPiece)
        }
    } else {
        if (squareArr[60].presentPiece != null && squareArr[63].presentPiece != null) {
            kingCastle(kingPlayerTwo, squareArr[60].presentPiece, squareArr[63].presentPiece)
        }
    }
}
function determinePlayerQueenCastle() {
    if (playerCounter % 2 == 0) {
        if (squareArr[4].presentPiece != null && squareArr[0].presentPiece != null) {
            queenCastle(kingPlayerOne, squareArr[4].presentPiece, squareArr[0].presentPiece)
        }
    } else {
        if (squareArr[60].presentPiece != null && squareArr[56].presentPiece != null) {
            queenCastle(kingPlayerTwo, squareArr[60].presentPiece, squareArr[56].presentPiece)
        }
    }
}
function verifyOriginPosition(kingSquare, colParRook, rowParRook) {
    for (let square of squareArr) {
        if (square.col == kingSquare.col && square.row == kingSquare.row) {
            if (square.presentPiece.posX == square.presentPiece.originPosX && square.presentPiece.posY == square.presentPiece.originPosY) {
                castleBool = true
            } else {
                castleBool = false
            }
        }
    }
    for (let square of squareArr) {
        if (square.col == colParRook && square.row == rowParRook) {
            if (square.presentPiece.posX == square.presentPiece.originPosX && square.presentPiece.posY == square.presentPiece.originPosY) {
                castleBool = true
            } else {
                castleBool = false
            }
        }
    }
}
function kingCastle(kingSquare, kingPiece, rookPiece) {
    verifyOriginPosition(kingSquare, rookPiece.col, rookPiece.row)
    if (castleBool) {
        for (let square of squareArr) {
            if (square.row == kingSquare.row) {
                if (square.col == kingSquare.col + 1 || square.col == kingSquare.col + 2) {
                    if (square.hasPiece == false) {
                        castleBool = true
                    } else {
                        castleBool = false
                        break
                    }
                }
            }
        }
    } else {
        return null;
    }
    if (castleBool) {
        kingPiece.col += 2
        kingPiece.posX += 2 * (CW / 8)
        rookPiece.col -= 2
        rookPiece.posX -= 2 * (CW / 8)
        playerCounter++
    }
}
function queenCastle(kingSquare, kingPiece, rookPiece) {
    verifyOriginPosition(kingSquare, rookPiece.col, rookPiece.row)
    if (castleBool) {
        for (let square of squareArr) {
            if (square.row == kingSquare.row) {
                if (square.col == kingSquare.col - 1 || square.col == kingSquare.col - 2 || square.col == kingSquare.col - 3) {
                    if (square.hasPiece == false) {
                        castleBool = true
                    } else {
                        castleBool = false
                        break
                    }
                }
            }
        }
    } else {
        return null;
    }
    if (castleBool) {
        kingPiece.col -= 3
        kingPiece.posX -= 3 * (CW / 8)
        rookPiece.col += 2
        rookPiece.posX += 2 * (CW / 8)
        playerCounter++
    }
}