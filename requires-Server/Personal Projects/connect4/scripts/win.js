function slowDownWin() {
    let intervalCounter = 0;
    let originalDistance = (avaliblePosY - circleArr[selectedCol][5 - selectedRow].posY);
    let winInterval = setInterval(function () {
        circleArr[selectedCol][5 - selectedRow].accel = Math.max((((avaliblePosY - circleArr[selectedCol][5 - selectedRow].posY) / 2100) * 16.6666666), (selectedRow / 4));
        intervalCounter++;
        if (intervalCounter > 2100) {
            clearInterval(winInterval);
        }
    }, 1);
    winMusic.volume = 1;
    winMusic.play();    
}

function winGlow(){
    for(let counter = Math.min(winCirclesCoords[0], winCirclesCoords[1]); counter < Math.max(winCirclesCoords[0], winCirclesCoords[1]) + 1; counter++){
        for(let counterTwo = Math.min(winCirclesCoords[2], winCirclesCoords[3]); counterTwo < Math.max(winCirclesCoords[2], winCirclesCoords[3]) + 1; counterTwo++){
            circleArr[counter][5 - counterTwo].glowBool = false;
            circleArr[counter][5 - counterTwo].deGlowBool = false;
            circleArr[counter][5 - counterTwo].glowCounter = 0;
            circleArr[counter][5 - counterTwo].deGlowCounter = 50;
            circleArr[counter][5 - counterTwo].active = true;
        }
    }
}