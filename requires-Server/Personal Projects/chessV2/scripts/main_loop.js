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