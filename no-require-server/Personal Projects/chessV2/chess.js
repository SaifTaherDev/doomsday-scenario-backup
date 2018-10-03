//Declaring all variables
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 0.995 * screen.height;
canvas.width = canvas.height;
canvas.style.marginLeft = 0.21 * screen.width + "px";
let canvasMargin = 0.21 * screen.width;
let CW = canvas.width;
let CH = canvas.height;
let squareArr = [];
let pieceArr = [];
let rookVertPositive = [];
let rookVertNegative = [];
let rookHorizPositive = [];
let rookHorizNegative = [];
let nameArr = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
let movesXArr = [8, 1, 8, 8, 1, 8, 1, 8];
let movesYArr = [8, 3, 8, 8, 1, 8, 3, 8];
let forCounter, forCounterTwo, rowSet, colSet, rowPos, colPos, clrSet, selectedPiece, selectedSquare, promotionPrompt, moveXInterval, moveYInterval, moveXDifference, moveYDifference;
//declaring all classes
class square {
    constructor(posX, posY, clr, col, row) {
        this.posX = posX
        this.posY = posY
        this.width = CW / 8
        this.height = CH / 8
        this.clr = clr
        this.originClr = clr
        this.col = col
        this.row = row
        this.hasPiece = false
        this.presentPiece = null
    }
}
class piece {
    constructor(posX, posY, col, row, name, player, clr) {
        this.posX = posX
        this.posY = posY
        this.width = CW / 8
        this.height = CH / 8
        this.col = col
        this.row = row
        this.name = name
        this.player = player
        this.clr = clr
        this.pawnFirstMove = false
    }
}
//declaring all functions

//create the board objects
function createBoard() {
    rowSet = 0
    colSet = 0
    rowPos = 0
    colPos = 0

    for (forCounter = 0; forCounter < 8; forCounter++) {
        colPos = 0
        colSet = 0
        if (forCounter % 2 == 0) {
            clrSet = "wheat"
        } else {
            clrSet = "black"
        }

        for (forCounterTwo = 0; forCounterTwo < 8; forCounterTwo++) {
            squareArr.push(new square(colPos, rowPos, clrSet, colSet, rowSet))
            colPos += CW / 8
            colSet++
            if (clrSet == "wheat") {
                clrSet = "black"
            } else {
                clrSet = "wheat"
            }
        }
        rowPos += CH / 8
        rowSet++
    }
}

//draw the board objects
function drawBoard() {
    for (let square of squareArr) {
        ctx.save()
        ctx.translate(square.posX, square.posY)
        ctx.fillStyle = square.clr
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(square.width, 0)
        ctx.lineTo(square.width, square.height)
        ctx.lineTo(0, square.height)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
    }
}

//create all the pieces
function createPieces() {
    rowSet = 0
    colSet = 0
    rowPos = 0
    colPos = 0

    for (forCounter = 0; forCounter < 8; forCounter++) {
        pieceArr.push(new piece(colPos, rowPos, colSet, rowSet, nameArr[forCounter], "playerOne", "red"))
        colPos += CW / 8
        colSet++
    }

    rowSet = 1
    colSet = 0
    rowPos = CH / 8
    colPos = 0

    for (forCounter = 0; forCounter < 8; forCounter++) {
        pieceArr.push(new piece(colPos, rowPos, colSet, rowSet, "pawn", "playerOne", "red"))
        colPos += CW / 8
        colSet++
    }

    rowSet = 6
    colSet = 0
    rowPos = (CH / 8) * 6
    colPos = 0

    for (forCounter = 0; forCounter < 8; forCounter++) {
        pieceArr.push(new piece(colPos, rowPos, colSet, rowSet, "pawn", "playerTwo", "orange"))
        colPos += CW / 8
        colSet++
    }

    rowSet = 7
    colSet = 0
    rowPos = (CH / 8) * 7
    colPos = 0

    for (forCounter = 0; forCounter < 8; forCounter++) {
        pieceArr.push(new piece(colPos, rowPos, colSet, rowSet, nameArr[forCounter], "playerTwo", "orange"))
        colPos += CW / 8
        colSet++
    }
}

//draw all pieces
function drawPieces() {
    for (let piece of pieceArr) {
        ctx.save()
        ctx.translate(piece.posX, piece.posY)
        ctx.fillStyle = "transparent"
        ctx.fillRect(0, 0, piece.width, piece.height)
        ctx.fillStyle = piece.clr
        ctx.fillRect(20, 20, 90, 90)
        ctx.fillStyle = "black"
        ctx.font = "12.5px Arial";
        ctx.textAlign = "center";
        ctx.fillText(piece.name, piece.width / 2, piece.height / 2);
        ctx.restore()
    }
}

//move all pieces
function determineSelected(xClick, yClick) {
    for (let piece of pieceArr) {
        if (xClick > piece.posX && xClick < piece.posX + piece.width) {
            if (yClick > piece.posY && yClick < piece.posY + piece.height) {
                selectedPiece = piece
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
                determineMoves(selectedSquare, selectedPiece)
            }
        }
    }

}
function rookMoves(squarePar, piecePar) {
    rookVertPositive = [];
    rookVertNegative = [];
    rookHorizPositive = [];
    rookHorizNegative = [];

    for (let square of squareArr) {
        if (square.row == squarePar.row) {
            if (square.col > squarePar.col) {
                rookHorizPositive.push(square)
            } else if (square.col < squarePar.col) {
                rookHorizNegative.unshift(square)
            }
        } else if (square.col == squarePar.col) {
            if (square.row > squarePar.row) {
                rookVertPositive.push(square)
            } else if (square.row < squarePar.row) {
                rookVertNegative.unshift(square)
            }
        }
    }

    if (piecePar.player == "playerOne") {
        for (let square of rookVertPositive) {
            if (square.hasPiece) {
                if (square.presentPiece.player == "playerTwo") {
                    square.clr = "blue"
                }
                break;
            } else {
                square.clr = "blue"
            }
        }
        for (let square of rookVertNegative) {
            if (square.hasPiece) {
                if (square.presentPiece.player == "playerTwo") {
                    square.clr = "blue"
                }
                break;
            } else {
                square.clr = "blue"
            }
        }
        for (let square of rookHorizPositive) {
            if (square.hasPiece) {
                if (square.presentPiece.player == "playerTwo") {
                    square.clr = "blue"
                }
                break;
            } else {
                square.clr = "blue"
            }
        }
        for (let square of rookHorizNegative) {
            if (square.hasPiece) {
                if (square.presentPiece.player == "playerTwo") {
                    square.clr = "blue"
                }
                break;
            } else {
                square.clr = "blue"
            }
        }
    } else {
        for (let square of rookVertPositive) {
            if (square.hasPiece) {
                if (square.presentPiece.player == "playerOne") {
                    square.clr = "blue"
                }
                break;
            } else {
                square.clr = "blue"
            }
        }
        for (let square of rookVertNegative) {
            if (square.hasPiece) {
                if (square.presentPiece.player == "playerOne") {
                    square.clr = "blue"
                }
                break;
            } else {
                square.clr = "blue"
            }
        }
        for (let square of rookHorizPositive) {
            if (square.hasPiece) {
                if (square.presentPiece.player == "playerOne") {
                    square.clr = "blue"
                }
                break;
            } else {
                square.clr = "blue"
            }
        }
        for (let square of rookHorizNegative) {
            if (square.hasPiece) {
                if (square.presentPiece.player == "playerOne") {
                    square.clr = "blue"
                }
                break;
            } else {
                square.clr = "blue"
            }
        }
    }
}

function knightMoves(squarePar, piecePar) {
    for (let square of squareArr) {
        if (piecePar.player == "playerOne") {
            if ((square.row == squarePar.row + 2 && square.col == squarePar.col + 1) || (square.row == squarePar.row - 2 && square.col == squarePar.col + 1) || (square.row == squarePar.row + 2 && square.col == squarePar.col - 1) || (square.row == squarePar.row - 2 && square.col == squarePar.col - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerTwo") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            } else if ((square.col == squarePar.col + 2 && square.row == squarePar.row + 1) || (square.col == squarePar.col - 2 && square.row == squarePar.row + 1) || (square.col == squarePar.col + 2 && square.row == squarePar.row - 1) || (square.col == squarePar.col - 2 && square.row == squarePar.row - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerTwo") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            }
        } else {
            if ((square.row == squarePar.row + 2 && square.col == squarePar.col + 1) || (square.row == squarePar.row - 2 && square.col == squarePar.col + 1) || (square.row == squarePar.row + 2 && square.col == squarePar.col - 1) || (square.row == squarePar.row - 2 && square.col == squarePar.col - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerOne") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            } else if ((square.col == squarePar.col + 2 && square.row == squarePar.row + 1) || (square.col == squarePar.col - 2 && square.row == squarePar.row + 1) || (square.col == squarePar.col + 2 && square.row == squarePar.row - 1) || (square.col == squarePar.col - 2 && square.row == squarePar.row - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerOne") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            }
        }
    }
}

function bishopMoves(squarePar, piecePar) {
    console.log(piecePar.name)
}

function queenMoves(squarePar, piecePar) {
    console.log(piecePar.name)
}

function kingMoves(squarePar, piecePar) {
    for (let square of squareArr) {
        if (piecePar.player == "playerOne") {
            if (square.row == squarePar.row && (square.col == squarePar.col + 1 || square.col == squarePar.col - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerTwo") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            } else if (square.col == squarePar.col && (square.row == squarePar.row + 1 || square.row == squarePar.row - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerTwo") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            } else if ((square.row == squarePar.row + 1 || square.row == squarePar.row - 1) && (square.col == squarePar.col + 1 || square.col == squarePar.col - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerTwo") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            }
        } else {
            if (square.row == squarePar.row && (square.col == squarePar.col + 1 || square.col == squarePar.col - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerOne") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            } else if (square.col == squarePar.col && (square.row == squarePar.row + 1 || square.row == squarePar.row - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerOne") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            } else if ((square.row == squarePar.row + 1 || square.row == squarePar.row - 1) && (square.col == squarePar.col + 1 || square.col == squarePar.col - 1)) {
                if (square.hasPiece) {
                    if (square.presentPiece.player == "playerOne") {
                        square.clr = "blue"
                    }
                } else {
                    square.clr = "blue"
                }
            }
        }
    }
}

function pawnMoves(squarePar, piecePar) {
    for (let square of squareArr) {
        if (square.col == squarePar.col) {
            if (piecePar.player == "playerOne") {
                if (square.row == squarePar.row + 1) {
                    if (square.hasPiece) {
                        square.clr = square.originClr
                    } else {
                        square.clr = "blue"
                    }
                } else if (piecePar.pawnFirstMove == false) {
                    if (square.row == squarePar.row + 2) {
                        if (square.hasPiece) {
                            square.clr = square.originClr
                        } else {
                            square.clr = "blue"
                        }
                        pieceArr[pieceArr.indexOf(piecePar)].pawnFirstMove = true
                    }
                }
            } else {
                if (square.row == squarePar.row - 1) {
                    if (square.hasPiece) {
                        square.clr = square.originClr
                    } else {
                        square.clr = "blue"
                    }
                } else if (piecePar.pawnFirstMove == false) {
                    if (square.row == squarePar.row - 2) {
                        if (square.hasPiece) {
                            square.clr = square.originClr
                        } else {
                            square.clr = "blue"
                        }
                        pieceArr[pieceArr.indexOf(piecePar)].pawnFirstMove = true
                    }
                }
            }
        } else if (square.col == squarePar.col + 1 || square.col == squarePar.col - 1) {
            if (piecePar.player == "playerOne") {
                if (square.row == squarePar.row + 1) {
                    if (square.hasPiece) {
                        if (square.presentPiece.player == "playerOne") {
                            square.clr = square.originClr
                        } else {
                            square.clr = "blue"
                        }
                    } else {
                        square.clr = square.originClr
                    }
                }
            } else {
                if (square.row == squarePar.row - 1) {
                    if (square.hasPiece) {
                        if (square.presentPiece.player == "playerTwo") {
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
    if (piecePar.player == "playerOne") {
        if (piecePar.row > 6) {
            promotionPrompt = prompt("you have been promoted! Choose from the following ranks: Rook, Knight, Bishop, Queen.")
            transformPawn(piecePar)
        }
    } else {
        if (piecePar.row < 1) {
            promotionPrompt = prompt("you have been promoted! Choose from the following ranks: Rook, Knight, Bishop, Queen.")
            transformPawn(piecePar)
        }
    }
}
function transformPawn(piecePar) {
    switch (promotionPrompt.toLowerCase()) {
        case "rook":
            pieceArr[pieceArr.indexOf(piecePar)].name = "rook"
            break;
        case "knight":
            pieceArr[pieceArr.indexOf(piecePar)].name = "knight"
            break;
        case "bishop":
            pieceArr[pieceArr.indexOf(piecePar)].name = "bishop"
            break;
        case "queen":
            pieceArr[pieceArr.indexOf(piecePar)].name = "queen"
            break;
    } 
}
function determineMoves(squarePar, piecePar) {
    for (let square of squareArr) {
        square.clr = square.originClr
    }
    switch (piecePar.name) {
        case "rook":
            rookMoves(squarePar, piecePar)
            break;
        case "knight":
            knightMoves(squarePar, piecePar)
            break;
        case "bishop":
            bishopMoves(squarePar, piecePar)
            break;
        case "queen":
            queenMoves(squarePar, piecePar)
            break;
        case "king":
            kingMoves(squarePar, piecePar)
            break;
        case "pawn":
            pawnMoves(squarePar, piecePar)
            break;
    }
}

function movePiece(xClick, yClick, piece) {
    for (let square of squareArr) {
        if (xClick > square.posX && xClick < square.posX + square.width) {
            if (yClick > square.posY && yClick < square.posY + square.height) {
                selectedSquare = square
            }
        }
    }
    if (selectedSquare.clr == "blue") {
        if (piece.posX < selectedSquare.posX) {
            moveXDifference = (selectedSquare.posX - piece.posX) / 30
            moveXInterval = setInterval(function () {
                if (piece.posX < selectedSquare.posX) {
                    piece.posX += moveXDifference
                } else {
                    piece.posX = selectedSquare.posX
                    clearInterval(moveXInterval)
                }
            }, 16.6666666)
        } else if (piece.posX > selectedSquare.posX){
            moveXDifference = (piece.posX - selectedSquare.posX) / 30
            moveXInterval = setInterval(function () {
                if (piece.posX > selectedSquare.posX) {
                    piece.posX -= moveXDifference
                } else {
                    piece.posX = selectedSquare.posX
                    clearInterval(moveXInterval)
                }
            }, 16.6666666)
        }

        if (piece.posY < selectedSquare.posY) {
            moveYDifference = (selectedSquare.posY - piece.posY) / 30
            moveYInterval = setInterval(function () {
                if (piece.posY < selectedSquare.posY) {
                    piece.posY += moveYDifference
                } else {
                    piece.posY = selectedSquare.posY
                    clearInterval(moveYInterval)
                }
            }, 16.6666666)
        } else {
            moveYDifference = (piece.posY - selectedSquare.posY) / 30
            moveYInterval = setInterval(function () {
                if (piece.posY > selectedSquare.posY) {
                    piece.posY -= moveYDifference
                } else {
                    piece.posY = selectedSquare.posY
                    clearInterval(moveYInterval)
                }
            }, 16.6666666)
        }
        if (selectedSquare.hasPiece) {
            pieceArr.splice(pieceArr.indexOf(selectedSquare.presentPiece), 1)
        }
        piece.row = selectedSquare.row
        piece.col = selectedSquare.col
    }
    for (let square of squareArr) {
        square.clr = square.originClr
    }
}

function determine(e) {
    determineSelected(e.clientX - canvasMargin, e.clientY)
    canvas.removeEventListener("click", determine)
    canvas.addEventListener("click", move)
}

function move(e) {
    movePiece(e.clientX - canvasMargin, e.clientY, pieceArr[pieceArr.indexOf(selectedPiece)])
    canvas.addEventListener("click", determine)
}

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
//the mainLoop
function mainLoop() {
    drawBoard()
    drawPieces()
    requestAnimationFrame(mainLoop)
}
//start of program flow
createBoard()
createPieces()
mainLoop()
setInterval(function() { updateStates() }, 1)
canvas.addEventListener("click", determine)