//Declaring all variables
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 0.9985 * screen.height;
canvas.width = canvas.height;
canvas.style.marginLeft = 0.1875 * screen.width + "px";
const canvasMargin = 0.1875 * screen.width;
const CW = canvas.width;
const CH = canvas.height;
let playerCounter = 0;
let squareArr = [];
let pieceArr = [];
let nameArr = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
let movesXArr = [8, 1, 8, 8, 1, 8, 1, 8];
let movesYArr = [8, 3, 8, 8, 1, 8, 3, 8];
let forCounter, forCounterTwo, forCounterThree, rowSet, colSet, rowPos, colPos, clrSet, selectedPiece, selectedSquare, promotionPrompt, moveXInterval, moveYInterval, moveXDifference, moveYDifference, kingPlayerOne, kingPlayerTwo, validChoice, interval, movingBoolean, mainAnimation, blueSquareArr, pawnTwoMovesBool, killedPiece, uponStopInterval, squareHasPieceBool, castleBool;
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
//images
const imgDivOne = document.body.querySelector("#deadPiecesOne .imgContainer")
const imgDivTwo = document.body.querySelector("#deadPiecesTwo .imgContainer")
let imagesOne = document.body.querySelectorAll("#deadPiecesOne .imgContainer img")
let imagesTwo = document.body.querySelectorAll("#deadPiecesTwo .imgContainer img")
let newImg, newAtt, newAttTwo;
const imgArrOne = document.body.querySelectorAll("#playerOneImg img")
const imgArrTwo = document.body.querySelectorAll("#playerTwoImg img")
const pawnImgOne = document.body.querySelector("#pawnPlayerOne")
const pawnImgTwo = document.body.querySelector("#pawnPlayerTwo")
const pieceWidthArr = [0.75, 0.75, 0.5, 0.6, 0.6, 0.5, 0.75, 0.75]
let scoreOneElem = document.body.querySelector("#scoreOne h1")
let scoreTwoElem = document.body.querySelector("#scoreTwo h1")
let scoreOne = 0
let scoreTwo = 0