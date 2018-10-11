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