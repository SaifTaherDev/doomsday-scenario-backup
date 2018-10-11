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
                        console.log(squareHasPieceBool)
                        scoreOne--
                    }
                    for (let img of imgArr) {
                        if (img.src == killedPiece.img.src && img.style.display != "none") {
                            img.style.display = "none"
                            break
                        }
                    }
                    alert("You can't check yourself!")
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
                        console.log(squareHasPieceBool)
                        scoreTwo--
                    }
                    alert("You can't check yourself!")
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