//Declaring all variables
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 0.9985 * screen.height;
canvas.width = canvas.height;
canvas.style.marginLeft = 0.19 * screen.width + "px";
const canvasMargin = 0.19 * screen.width;
const CW = canvas.width;
const CH = canvas.height;
let playerCounter = 0;
let squareArr = [];
let pieceArr = [];
let nameArr = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
let movesXArr = [8, 1, 8, 8, 1, 8, 1, 8];
let movesYArr = [8, 3, 8, 8, 1, 8, 3, 8];
let forCounter, forCounterTwo, forCounterThree, rowSet, colSet, rowPos, colPos, clrSet, selectedPiece, selectedSquare, promotionPrompt, moveXInterval, moveYInterval, moveXDifference, moveYDifference, kingPlayerOne, kingPlayerTwo, validChoice, interval, movingBoolean, mainAnimation, blueSquareArr, pawnTwoMovesBool, killedPiece, uponStopInterval, squareHasPieceBool;
let vertPositive, vertNegative, horizPositive, horizNegative, diagonalTopPositive, diagonalTopNegative, diagonalBottomPositive, diagonalBottomNegative;
let possibleMovesPlayerOne, possibleMovesPlayerTwo, vertPositiveUpdate, vertNegativeUpdate, horizPositiveUpdate, horizNegativeUpdate, diagonalTopPositiveUpdate, diagonalTopNegativeUpdate, diagonalBottomPositiveUpdate, diagonalBottomNegativeUpdate;
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
    constructor(posX, posY, col, row, name, player, img, widthFactor) {
        this.posX = posX
        this.posY = posY
        this.width = CW / 8
        this.height = CH / 8
        this.col = col
        this.row = row
        this.name = name
        this.player = player
        this.originPosX = this.posX
        this.originPosY = this.posY
        this.lastPosX = this.posX
        this.lastPosY = this.posY
        this.moveCounter = 0
        this.img = img
        this.imgWidth = this.width * widthFactor
    }
}
//sounds & music
const music = new Howl({
    src: "Music_FX/chessBackgroundMusic.mp3",
    loop: true,
    volume: 0.5
})
const soundFX = [
    new Howl({
        src: "Music_FX/chessFX-1.mp3"
    }),
    new Howl({
        src: "Music_FX/chessFX-2.mp3"
    }),
    new Howl({
        src: "Music_FX/chessFX-3.mp3"
    }),
]
const imgDivOne = document.body.querySelector("#deadPiecesOne .imgContainer")
const imgDivTwo = document.body.querySelector("#deadPiecesTwo .imgContainer")
let imagesOne = document.body.querySelectorAll("#deadPiecesOne .imgContainer img")
let imagesTwo = document.body.querySelectorAll("#deadPiecesTwo .imgContainer img")
let newImg, newAtt, newAttTwo;
let scoreOneElem = document.body.querySelector("#scoreOne h1")
let scoreTwoElem = document.body.querySelector("#scoreTwo h1")
let scoreOne = 0
let scoreTwo = 0
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
            clrSet = "peru"
        } else {
            clrSet = "black"
        }

        for (forCounterTwo = 0; forCounterTwo < 8; forCounterTwo++) {
            squareArr.push(new square(colPos, rowPos, clrSet, colSet, rowSet))
            colPos += CW / 8
            colSet++
            if (clrSet == "peru") {
                clrSet = "black"
            } else {
                clrSet = "peru"
            }
        }
        rowPos += CH / 8
        rowSet++
    }
}
//images
const imgArrOne = document.body.querySelectorAll("#playerOneImg img")
const imgArrTwo = document.body.querySelectorAll("#playerTwoImg img")
const pawnImgOne = document.body.querySelector("#pawnPlayerOne")
const pawnImgTwo = document.body.querySelector("#pawnPlayerTwo")
const pieceWidthArr = [0.75, 0.75, 0.5, 0.6, 0.6, 0.5, 0.75, 0.75]
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
        pieceArr.push(new piece(colPos, rowPos, colSet, rowSet, nameArr[forCounter], "playerOne", imgArrOne[forCounter], pieceWidthArr[forCounter]))
        colPos += CW / 8
        colSet++
    }

    rowSet = 1
    colSet = 0
    rowPos = CH / 8
    colPos = 0

    for (forCounter = 0; forCounter < 8; forCounter++) {
        pieceArr.push(new piece(colPos, rowPos, colSet, rowSet, "pawn", "playerOne", pawnImgOne, 0.75))
        colPos += CW / 8
        colSet++
    }

    rowSet = 6
    colSet = 0
    rowPos = (CH / 8) * 6
    colPos = 0

    for (forCounter = 0; forCounter < 8; forCounter++) {
        pieceArr.push(new piece(colPos, rowPos, colSet, rowSet, "pawn", "playerTwo", pawnImgTwo, 0.75))
        colPos += CW / 8
        colSet++
    }

    rowSet = 7
    colSet = 0
    rowPos = (CH / 8) * 7
    colPos = 0

    for (forCounter = 0; forCounter < 8; forCounter++) {
        pieceArr.push(new piece(colPos, rowPos, colSet, rowSet, nameArr[forCounter], "playerTwo", imgArrTwo[forCounter], pieceWidthArr[forCounter]))
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
        ctx.drawImage(piece.img, (piece.width - piece.imgWidth) / 2, 0, piece.imgWidth, piece.height)
        ctx.restore()
    }
}

//move all pieces
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
        } else {
            if (possibleMovesPlayerOne.includes(square)) {
                square.clr = square.originClr
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

function transformPawn(piecePar) {
    switch (promotionPrompt.toLowerCase()) {
        case "rook":
            pieceArr[selectedPiece].name = "rook"
            validChoice = true
            break;
        case "knight":
            pieceArr[selectedPiece].name = "knight"
            validChoice = true
            break;
        case "bishop":
            pieceArr[selectedPiece].name = "bishop"
            validChoice = true
            break;
        case "queen":
            pieceArr[selectedPiece].name = "queen"
            validChoice = true
            break;
        default:
            validChoice = false
            break;
    }
    for (let piece of pieceArr) {
        if (piece.name == pieceArr[selectedPiece].name && piece.player == pieceArr[selectedPiece].player) {
            pieceArr[selectedPiece].img = piece.img
            pieceArr[selectedPiece].imgWidth = piece.imgWidth
        }
    }
}

function promote(piecePar) {
    if (piecePar.name == "pawn") {
        if (piecePar.player == "playerOne") {
            if (piecePar.row == 7) {
                promotionPrompt = prompt("You've been promoted! Choose from the following ranks: 1. Queen, 2. Bishop, 3. Rook, 4. Knight")
                transformPawn()
            }
        } else {
            if (piecePar.row == 0) {
                promotionPrompt = prompt("You've been promoted! Choose from the following ranks: 1. Queen, 2. Bishop, 3. Rook, 4. Knight")
                transformPawn()
            }
        }
    }
    while (validChoice == false) {
        promotionPrompt = prompt("You've been promoted! Choose from the following ranks: 1. Queen, 2. Bishop, 3. Rook, 4. Knight")
        transformPawn()
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

function movePiece(xClick, yClick, piece, imgDiv) {
    for (let square of squareArr) {
        if (xClick > square.posX && xClick < square.posX + square.width) {
            if (yClick > square.posY && yClick < square.posY + square.height) {
                selectedSquare = square
            }
        }
    }
    squareHasPieceBool = selectedSquare.hasPiece
    if (selectedSquare.clr == "blue") {
        if (selectedSquare.presentPiece != null && selectedSquare.presentPiece.name == "king") {
            selectedSquare.clr = "red"
        }
        piece.moveCounter++
        if (piece.moveCounter > 1) {
            piece.lastPosX = piece.posX
            piece.lastPosY = piece.posY
        }
        clearInterval(interval)
        if (piece.posX < selectedSquare.posX) {
            moveXDifference = (selectedSquare.posX - piece.posX) / 30
            moveXInterval = setInterval(function() {
                if (piece.posX < selectedSquare.posX) {
                    piece.posX += moveXDifference
                    movingBoolean = true
                } else {
                    piece.posX = selectedSquare.posX
                    clearInterval(moveXInterval)
                }
            }, 16.6666666)
        } else if (piece.posX > selectedSquare.posX) {
            moveXDifference = (piece.posX - selectedSquare.posX) / 30
            moveXInterval = setInterval(function() {
                if (piece.posX > selectedSquare.posX) {
                    piece.posX -= moveXDifference
                    movingBoolean = true
                } else {
                    piece.posX = selectedSquare.posX
                    clearInterval(moveXInterval)
                }
            }, 16.6666666)
        }

        if (piece.posY < selectedSquare.posY) {
            moveYDifference = (selectedSquare.posY - piece.posY) / 30
            moveYInterval = setInterval(function() {
                if (piece.posY < selectedSquare.posY) {
                    piece.posY += moveYDifference
                    movingBoolean = true
                } else {
                    piece.posY = selectedSquare.posY
                    clearInterval(moveYInterval)
                }
            }, 16.6666666)
        } else {
            moveYDifference = (piece.posY - selectedSquare.posY) / 30
            moveYInterval = setInterval(function() {
                if (piece.posY > selectedSquare.posY) {
                    piece.posY -= moveYDifference
                    movingBoolean = true
                } else {
                    piece.posY = selectedSquare.posY
                    clearInterval(moveYInterval)
                }
            }, 16.6666666)
        }
        uponStopInterval = setInterval(uponStopExe, 1)
        if (selectedSquare.hasPiece) {
            killedPiece = selectedSquare.presentPiece
            newImg = document.createElement("img")
            newAtt = document.createAttribute("src")
            newAtt.value = selectedSquare.presentPiece.img.src
            newAttTwo = document.createAttribute("class")
            newAttTwo.value = selectedSquare.presentPiece.img.src
            newImg.setAttributeNode(newAtt);
            newImg.setAttributeNode(newAttTwo);
            imgDiv.appendChild(newImg)
            pieceArr.splice(pieceArr.indexOf(selectedSquare.presentPiece), 1)
            if (playerCounter % 2 == 0) {
                scoreOne++
                scoreOneElem.innerHTML = "Player One Score: " + JSON.stringify(scoreOne)
            } else {
                scoreTwo++
                scoreTwoElem.innerHTML = "Player One Score: " + JSON.stringify(scoreTwo)
            }
        }
        piece.row = selectedSquare.row
        piece.col = selectedSquare.col
    }
}
function uponStopExe() {
    imagesOne = document.body.querySelectorAll("#deadPiecesOne .imgContainer img")
    imagesTwo = document.body.querySelectorAll("#deadPiecesTwo .imgContainer img")
    if (pieceArr[selectedPiece].player == "playerOne") {
        verifyNoCheckBefore(pieceArr[selectedPiece], selectedSquare, imagesOne, imgDivOne)
    } else {
        verifyNoCheckBefore(pieceArr[selectedPiece], selectedSquare, imagesTwo, imgDivTwo)
    }
    
}
function determine(e) {
    determineSelected(e.clientX - canvasMargin, e.clientY)
    canvas.removeEventListener("click", determine)
    canvas.addEventListener("click", move)
}

function move(e) {
    if (pieceArr[selectedPiece].player == "playerOne") {
        movePiece(e.clientX - canvasMargin, e.clientY, pieceArr[selectedPiece], imgDivOne)
    } else {
        movePiece(e.clientX - canvasMargin, e.clientY, pieceArr[selectedPiece], imgDivTwo)
    }
    canvas.addEventListener("click", determine)
    for (let square of squareArr) {
        square.clr = square.originClr
    }
}
function verifyNoCheckBefore(piecePar, squarePar, imgArr, element) {
    if (piecePar.posX == selectedSquare.posX && piecePar.posY == selectedSquare.posY) {
        interval = setInterval(function () {
            updateStates();
            checkForCheck();
            checkMate();
        }, 1)
        setTimeout(function () {
            if (piecePar.player == "playerOne") {
                if (possibleMovesPlayerTwo.includes(kingPlayerOne)) {
                    piecePar.posX = piecePar.lastPosX
                    piecePar.posY = piecePar.lastPosY
                    if (squareHasPieceBool) {
                        pieceArr.push(killedPiece)
                    }
                    for (let img of imgArr) {
                        if (img.src == killedPiece.img.src && img.style.display != "none") {
                            img.style.display = "none"
                            break
                        }
                    }
                    alert("You can't check yourself!")
                    scoreOne--
                    scoreOneElem.innerHTML = "Player One Score: " + scoreOne
                } else {
                    promote(piecePar)
                    soundFX[Math.floor(Math.random() * 2.99)].play()
                    setTimeout(function () {
                        playerCounter++
                        movingBoolean = false
                        for (let square of squareArr) {
                            square.clr = square.originClr
                        }
                    }, 10)
                }
            } else {
                if (possibleMovesPlayerOne.includes(kingPlayerTwo)) {
                    piecePar.posX = piecePar.lastPosX
                    piecePar.posY = piecePar.lastPosY
                    if (squareHasPieceBool) {
                        pieceArr.push(killedPiece)
                    }
                    alert("You can't check yourself!")
                    scoreTwo--
                    scoreTwoElem.innerHTML = "Player Two Score: " + scoreTwo
                } else {
                    soundFX[Math.floor(Math.random() * 2.99)].play()
                    promote(piecePar)
                    setTimeout(function () {
                        playerCounter++
                        movingBoolean = false
                        for (let square of squareArr) {
                            square.clr = square.originClr
                        }
                    }, 10)
                }
            }
        }, 5)
        clearInterval(uponStopInterval)
    }
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

function checkForCheck() {
    possibleMovesPlayerOne = []
    possibleMovesPlayerTwo = []
    for (let square of squareArr) {
        if (square.presentPiece != null) {
            if (square.presentPiece.player == "playerOne") {
                switch (square.presentPiece.name) {
                    case "pawn":
                        updatePawn(square, 1, possibleMovesPlayerOne)
                        break;
                    case "rook":
                        updateRook(square, possibleMovesPlayerOne)
                        break;
                    case "bishop":
                        updateBishop(square, possibleMovesPlayerOne)
                        break;
                    case "knight":
                        updateKnight(square, possibleMovesPlayerOne)
                        break;
                    case "queen":
                        updateQueen(square, possibleMovesPlayerOne)
                        break;
                }
            } else {
                switch (square.presentPiece.name) {
                    case "pawn":
                        updatePawn(square, -1, possibleMovesPlayerTwo)
                        break;
                    case "rook":
                        updateRook(square, possibleMovesPlayerTwo)
                        break;
                    case "bishop":
                        updateBishop(square, possibleMovesPlayerTwo)
                        break;
                    case "knight":
                        updateKnight(square, possibleMovesPlayerTwo)
                        break;
                    case "queen":
                        updateQueen(square, possibleMovesPlayerTwo)
                        break;
                }
            }
        }
    }
}

function checkMate() {
    for (let square of squareArr) {
        if (square.presentPiece != null && square.presentPiece.name == "king") {
            if (square.presentPiece.player == "playerOne") {
                kingPlayerOne = square
            } else {
                kingPlayerTwo = square
            }
        }
    }
    if (possibleMovesPlayerTwo.includes(kingPlayerOne)) {
        kingPlayerOne.clr = "red"
    } else {
        kingPlayerOne.clr = kingPlayerOne.originClr
    }
    if (possibleMovesPlayerOne.includes(kingPlayerTwo)) {
        kingPlayerTwo.clr = "red"
    } else {
        kingPlayerTwo.clr = kingPlayerTwo.originClr
    }
}
//the mainLoop
music.play()
function mainLoop() {
    drawBoard()
    drawPieces()
}
//start of program flow
createBoard()
createPieces()
mainAnimation = setInterval(function () {
    mainLoop()
}, 16.6666666666666)
interval = setInterval(function() {
    updateStates();
    checkForCheck();
    checkMate();
}, 1)
canvas.addEventListener("click", determine)