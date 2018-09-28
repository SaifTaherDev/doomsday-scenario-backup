//Drawing & Animating: Declaring Variables
const canvas = document.body.querySelector("canvas")
const ctx = canvas.getContext('2d')
canvas.width = 0.5 * screen.width
canvas.height = 0.98 * window.innerHeight
let CW = canvas.width
let CH = canvas.height
let pieceArr = []
let squareArr = []
let posX = 0
let posY = 0
let maxNum = 0
let counter, counterTwo, pieceCounter, pieceCounterTwo, clr, clickEvent, moveEvent, stopEvent, centerX, centerY, centerIndex, selectedPiece

//Drawing & Animating: Defining Classes
class piece {
    constructor(x, y, width, height, player) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.player = player
    }
}
class square{
    constructor(x, y, clr){
        this.x = x
        this.y = y
        this.clr = clr
    }
}

//Drawing & Animating: Defining Functions

//Dynamically Draw Each Individual Square
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

//Dynamically Draw The Board
function createBoard() {
    for (counter = 0; counter < 8; counter++) {
        for (counterTwo = 0; counterTwo < 8; counterTwo++) {
            if (counter % 2 == 0) {
                if (counterTwo % 2 == 0) {
                    clr = "beige"
                } else {
                    clr = "black"
                }
            } else {
                if (counterTwo % 2 == 0) {
                    clr = "black"
                } else {
                    clr = "beige"
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
    posY = 0
    for (pieceCounter = 0; pieceCounter < 2; pieceCounter++ , posY += CH / 8) {
        posX = 0
        for (pieceCounterTwo = 0; pieceCounterTwo < 8; pieceCounterTwo++ , posX += CW/8) {
            pieceArr.push(new piece(posX, posY, 95, 90, "playerOne"))
        }
    }

    posY = (CH / 8) * 6

    for (pieceCounter = 0; pieceCounter < 2; pieceCounter++ , posY += CH / 8) {
        posX = 0
        for (pieceCounterTwo = 0; pieceCounterTwo < 8; pieceCounterTwo++ , posX += CW / 8) {
            pieceArr.push(new piece(posX, posY, 95, 90, "playerTwo"))
        }
    }
}
function drawPieces() {
    for (let piece of pieceArr) {
        ctx.save()
        ctx.translate(piece.x + (100 - piece.width) / 2, piece.y + (100 - piece.height) / 8)
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(95, 0)
        ctx.lineTo(95, 90)
        ctx.lineTo(0, 90)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
        ctx.restore()
    }
}
//Change Location Of Pieces
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
    movePieces(e.clientX - 450, e.clientY, pieceArr[selectedPiece])
}
function preventOverlap() {
   
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
    canvas.width = 0.5 * screen.width
    CW = canvas.width
    drawBoard()
    drawPieces()
    requestAnimationFrame(mainLoop)
}

//Start of Program Flow
createBoard()
createPieces()
mainLoop()

clickEvent = canvas.addEventListener("mousedown", function (e) {
    for (let piece of pieceArr) {
        if (e.clientX - 450 > piece.x - 50 && e.clientX - 450 < piece.x + piece.width - 50) {
            if (e.clientY > piece.y && e.clientY < piece.y + piece.height) {
                selectedPiece = pieceArr.indexOf(piece)
            }
        }
    }
    moveEvent = addEventListener("mousemove", move)
})
stopEvent = addEventListener("mouseup", function () {
    preventOverlap()
    pieceArr[centerIndex].x = centerX
    pieceArr[centerIndex].y = centerY
    moveEvent = removeEventListener("mousemove", move)
})