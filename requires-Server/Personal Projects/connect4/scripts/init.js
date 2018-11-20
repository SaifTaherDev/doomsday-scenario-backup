let canvas = document.body.querySelector("#canvasOne");
let ctxOne = canvas.getContext("2d");
let canvasTwo = document.body.querySelector("#canvasTwo");
let ctxTwo = canvasTwo.getContext("2d");
let img = document.body.querySelector("img");
canvas.width = 0.55 * screen.width;
canvas.height = canvas.width;
canvasTwo.width = 0.55 * screen.width;
canvasTwo.height = canvasTwo.width;
let CW = canvas.width;
let CH = canvas.height;
let mousePosXCorrection = (screen.width / 2) - (canvas.width / 2);
let mousePosYCorrection = (screen.height / 2) - (canvas.height / 2);
canvas.style.left = mousePosXCorrection + "px";
canvas.style.top = mousePosYCorrection + "px";
canvasTwo.style.left = mousePosXCorrection + "px";
canvasTwo.style.top = mousePosYCorrection + "px";
let selectedCol, selectedRow;
let playerCounter = 0;
let streak, avaliblePosY;
let winCirclesCoords = [null, null, null, null];
let circleArr = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
let squareArr = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
let winMusic = new Howl({
    src:"audio/winMusic.mp3",
    volume: 1
});
winMusic.volume = 0;
winMusic.play();
setTimeout(function(){winMusic.pause();}, 100);