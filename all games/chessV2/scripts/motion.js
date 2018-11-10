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
            moveXInterval = setInterval(function () {
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
            moveXInterval = setInterval(function () {
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
            moveYInterval = setInterval(function () {
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
            moveYInterval = setInterval(function () {
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