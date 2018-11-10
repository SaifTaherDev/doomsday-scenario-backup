//Drawing & Animating: Declaring Variables
const canvas = document.body.querySelector("canvas")
const ctx = canvas.getContext('2d')
canvas.width = 0.475 * screen.width
canvas.height = 0.7 * screen.height
let CW = canvas.width
let CH = canvas.height
let pieceArr = []
let squareArr = []
let squareClrArr = [0, 0, 0]
let piecesArrOne = ["images/playerOne/Rook.png", "images/playerOne/Knight.png", "images/playerOne/Bishop.png", "images/playerOne/King.png", "images/playerOne/Queen.png", "images/playerOne/Bishop.png", "images/playerOne/Knight.png", "images/playerOne/Rook.png"]
let piecesArrTwo = ["images/playerTwo/Rook.png", "images/playerTwo/Knight.png", "images/playerTwo/Bishop.png", "images/playerTwo/King.png", "images/playerTwo/Queen.png", "images/playerTwo/Bishop.png", "images/playerTwo/Knight.png", "images/playerTwo/Rook.png"]
let imgArr = document.body.querySelectorAll("img")
let posX = 0
let posY = 0
let maxNum = 0
let counter, counterTwo, pieceCounter, clr, clickEvent, moveEvent, stopEvent, centerX, centerY, centerIndex, selectedPiece, selectedSquare, currentImg

//Drawing & Animating: Defining Classes
class piece {
    constructor(x, y, width, height, player, clr, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.player = player
        this.clr = clr
        this.img = img
        this.imgWidth = 75
        this.imgHeight = 100
    }
}
class square {
    constructor(x, y, clr) {
        this.x = x
        this.y = y
        this.clr = clr
        this.hasSquare = false
    }
}

//Drawing & Animating: Defining Functions u DUMB ASSSSS

//Dynamically Draw Each Individual Square ass
function createSquare(x, y, clr) {
    squareArr.push(new square(x, y, clr))
}

function drawSquare(x, y, clr) {
    ctx.save()
    ctx.translate(x, y)
    ctx.fillStyle = clr
    ctx.fillRect(0, 0, CW / 8, CH / 8)
    ctx.restore()
}

//Dynamically Draw The Board WAAAAAAAAAAAAAA ?
function createBoard() {
    for (counter = 0; counter < 8; counter++) {
        for (counterTwo = 0; counterTwo < 8; counterTwo++) {
            if (counter % 2 == 0) {
                if (counterTwo % 2 == 0) {
                    clr = "wheat"
                } else {
                    clr = "black"
                }
            } else {
                if (counterTwo % 2 == 0) {
                    clr = "black"
                } else {
                    clr = "wheat"
                }
            }
            createSquare((CW / 8) * counterTwo, (CH / 8) * counter, clr)
        }
    }
}
function drawBoard() {
    for (let square of squareArr) {
        drawSquare(square.x, square.y, square.clr)
    }
}
function createPieces() {
    posX = 0
    posY = 0
    for (pieceCounter = 0; pieceCounter < 8; pieceCounter++ , posX += CW / 8) {
        pieceArr.push(new piece(posX, posY, 95, 90, "playerOne", "transparent", piecesArrOne[pieceCounter]))
    }
    posX = 0
    posY = CH / 8
    for (pieceCounter = 0; pieceCounter < 8; pieceCounter++ , posX += CW / 8) {
        pieceArr.push(new piece(posX, posY, 95, 90, "playerOne", "transparent", "images/playerOne/Pawn.png"))
    }
    posX = 0
    posY = (CH / 8) * 7

    for (pieceCounter = 0; pieceCounter < 8; pieceCounter++ , posX += CW / 8) {
        pieceArr.push(new piece(posX, posY, 95, 90, "playerTwo", "transparent", piecesArrTwo[pieceCounter]))
    }

    posX = 0
    posY = (CH / 8) * 6

    for (pieceCounter = 0; pieceCounter < 8; pieceCounter++ , posX += CW / 8) {
        pieceArr.push(new piece(posX, posY, 95, 90, "playerTwo", "transparent", "images/playerTwo/Pawn.png"))
    }
}
function drawPieces() {
    for (let piece of pieceArr) {
        ctx.save()
        ctx.translate(piece.x + (100 - piece.width) / 2, piece.y + (100 - piece.height) / 8)
        ctx.fillStyle = piece.clr
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(95, 0)
        ctx.lineTo(95, 90)
        ctx.lineTo(0, 90)
        ctx.closePath()
        ctx.fill()
        for (let imgElement of imgArr) {
            if (imgElement.src == "file:///F:/SaifWork/Code/no-require-server/Personal%20Projects/chess/" + piece.img) {
                currentImg = imgElement
            }
        }
        ctx.drawImage(currentImg, 10, -5, piece.imgWidth, piece.imgHeight)
        ctx.restore()
    }
}
//Change Location Of Pieces U BITCH
function movePieces(posX, posY, piece) {
    if (posX > piece.x - 50 && posX < piece.x + piece.width - 50) {
        if (posY > piece.y && posY < piece.y + piece.height) {
            piece.x = posX - (piece.width / 16)
            piece.y = posY - (piece.height / 2)
            centerAfterMove(piece.x + (piece.width / 2), piece.y + (piece.height / 2))
            centerIndex = pieceArr.indexOf(piece)
        }
    }
}
function move(e) {
    movePieces(e.clientX - 480, e.clientY, pieceArr[selectedPiece])
}
function determineSelectedSquare(posX, posY) {
    for (let square of squareArr) {
        if (posX > square.x && posX < square.x + 100) {
            if (posY > square.y && posY < square.y + 100) {
                selectedSquare = square
                break
            }
        }
    }
}
function preventOverlap(posX, posY) {
    for (let piece of pieceArr) {
        if (piece.player == "playerOne") {
            piece.clr = "red"
        } else {
            piece.clr = "blue"
        }
        piece.imgWidth = 0
        piece.imgHeight = 0
    }
    pieceArr[selectedPiece].clr = "transparent"

    setTimeout(function () {
        squareClrArr[0] = ctx.getImageData(posX, posY, 1, 1).data[0]
        squareClrArr[1] = ctx.getImageData(posX, posY, 1, 1).data[1]
        squareClrArr[2] = ctx.getImageData(posX, posY, 1, 1).data[2]
    }, 20)
    setTimeout(function () {
        if (squareClrArr[0] == 245 || (squareClrArr[0] == 0 && squareClrArr[2] == 0)) {
            pieceArr[centerIndex].x = centerX
            pieceArr[centerIndex].y = centerY
            moveEvent = removeEventListener("mousemove", move)
        } else if (squareClrArr[0] == 255) {
            if (pieceArr[selectedPiece].player == "playerOne") {
                pieceArr[selectedPiece].y += 50
            } else {
                for (let piece of pieceArr) {
                    if (piece.x == selectedSquare.x && piece.y == selectedSquare.y) {
                        pieceArr.splice(pieceArr.indexOf(piece), 1)
                    }
                }
            }
        } else if(squareClrArr[2] == 255) {
            if (pieceArr[selectedPiece].player == "playerTwo") {
                pieceArr[selectedPiece].y += 50
            } else {
                for (let piece of pieceArr) {
                    if (piece.x == selectedSquare.x && piece.y == selectedSquare.y) {
                        pieceArr.splice(pieceArr.indexOf(piece), 1)
                    }
                }
            }
        }
    }, 21)
    setTimeout(function () {
        for (let piece of pieceArr) {
            piece.clr = "transparent"
            piece.imgWidth = 75
            piece.imgHeight = 100
        }
    }, 22)
}
function centerAfterMove(x, y) {
    for (let square of squareArr) {
        if (x > square.x && x < square.x + 95) {
            if (y > square.y && y < square.y + 90) {
                centerX = square.x
                centerY = square.y
            }
        }
    }
}
function mainLoop() {
    canvas.width = 0.475 * screen.width
    CW = canvas.width
    drawBoard()
    drawPieces()
    requestAnimationFrame(mainLoop)
}

//Start of Program Flow U BITCH
createBoard()
createPieces()
mainLoop()

clickEvent = canvas.addEventListener("mousedown", function (e) {
    for (let piece of pieceArr) {
        if (e.clientX - 480 > piece.x - 50 && e.clientX - 480 < piece.x + piece.width - 50) {
            if (e.clientY > piece.y && e.clientY < piece.y + piece.height) {
                selectedPiece = pieceArr.indexOf(piece)
            }
        }
    }
    moveEvent = addEventListener("mousemove", move)
})
stopEvent = addEventListener("mouseup", function (e) {
    determineSelectedSquare(e.clientX - 480, e.clientY)
    preventOverlap(e.clientX - 450, e.clientY)
})