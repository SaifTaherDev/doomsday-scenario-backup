//Drawing & Animating: Classes & Variables Definitions
let canvas = document.body.querySelector("#gameCanvas");
let ctx = canvas.getContext("2d");
canvas.width =  window.innerWidth;
canvas.height = 0.9 * window.innerHeight;
let CW = canvas.width;
let CH = canvas.height;
let planeArr = [];
let hotShotsArr = [];
let planeCollisionCounter = 0;
let planeCounter = 0;
let escCounter = 0;
let shotsVelocity = 10;
let text = "";
let planeDecider = 0;
let levelNum = 1;
let backgroundPos = 0;
let backgroundScroll = 1;
let winCounter = 0;
let winfinal;
let destroyPlaneCounter = 0;
let backgroundMusic = new Howl({
    src: "Music_SoundFX/backgroudMusic.mp3",
    loop: true
})
let plasma = new Howl({
    src: "Music_SoundFX/plasma.mp3"
})
class plane {
    constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
    }
    drawPlane() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.size, this.size)
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10, -30);
        ctx.lineTo(10, -100);
        ctx.lineTo(40, -100);
        ctx.lineTo(40, -120);
        ctx.lineTo(-10, -100);
        ctx.lineTo(-40, -100);
        ctx.lineTo(-40, -120);
        ctx.lineTo(10, -100);
        ctx.lineTo(-10, -100);
        ctx.lineTo(-10, -75);
        ctx.lineTo(-70, -75);
        ctx.lineTo(-60, -60);
        ctx.lineTo(-10, -60);
        ctx.lineTo(10, -60);
        ctx.lineTo(60, -60);
        ctx.lineTo(70, -75);
        ctx.lineTo(10, -75);
        ctx.lineTo(-10, -60);
        ctx.lineTo(-10, -30);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.clearRect(-140, 0, 0, -120)
        ctx.restore();
    }
    animatePlane() {
        this.y += this.speed;
    }
}
class hotShot {
    constructor(x) {
        this.x = x;
        this.y = 0.95 * CH;
    }
}
let player = {
    x: CW / 2,
    y: 0.95 * CH
}
//Drawing & Animating: Functions Definitions
function drawPlayer() {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.translate(player.x, player.y);
    ctx.clearRect(-20, -40, 20, 0);
    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.lineTo(-20, 0);
    ctx.lineTo(0, -10);
    ctx.lineTo(20, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill()
    ctx.restore();
}
function drawHotShots() {
    for (let shot of hotShotsArr) {
        ctx.save();
        ctx.fillStyle = "white"
        ctx.translate(shot.x, shot.y)
        ctx.fillRect(-10,0,10,20)
        ctx.restore()
        shot.y -= shotsVelocity;
    }
}
function detectHits() {
    for (let shot of hotShotsArr) {
        planeCollisionCounter = 0;
        for (let plane of planeArr) {
            if (((shot.x - 10) > (plane.x - 40) && (shot.x + 10) < (plane.x + 40) && shot.y < plane.y - 10) || ((shot.x - 10) > (plane.x - 80) && (shot.x + 10) < (plane.x + 80) && shot.y < plane.y - 75)) {
                planeArr.splice(planeCollisionCounter, 1)
                hotShotsArr.splice(hotShotsArr.indexOf(shot), 1)
            }
            planeCollisionCounter++;
        }
    }
}
function movePlayer(e) {
    player.x = e.clientX;
}
function fireHotShots(e) {
    hotShotsArr.push(new hotShot(player.x))
    plasma.play()
}
function resetGame() {
    if (escCounter % 2 != 0) {
        escCounter++;
        backgroundScroll = 1;
        backgroundMusic.play()
    }
    clearInterval(newPlanes);
    canvas.addEventListener("mousemove", movePlayer)
    canvas.addEventListener("click", fireHotShots);
    text = ""
    ctx.clearRect(0, 0, CW, CH);
    planeArr = []
    planeCounter = 0
    shotsVelocity = 10;
    winCounter = 0;
    if (planeCounter == 25) {
        text = "You win!";
    } else {
        text = "";
        }
}
function changeLevel() {
    switch (levelNum) {
        case 1:
            resetGame();
            newPlanes = setInterval(function newPlanes() {
                if (planeCounter < 25) {
                    planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                    planeCounter++;
                }
            }, 1000)
            break;
        case 2:
            resetGame();
            newPlanes = setInterval(function newPlanes() {
                if (planeCounter < 25) {
                    planeDecider = Math.random()
                    if (planeDecider > 0.5) {
                        planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                    } else {
                        planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.75, "yellow", 7.5));
                    }
                    planeCounter++;
                }
            }, 650)
            break;
        case 3:
            resetGame()
            newPlanes = setInterval(function newPlanes() {
                if (planeCounter < 25) {
                    planeDecider = Math.random()
                    if (planeDecider > 0.666666) {
                        planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                    } else if (planeDecider > 0.3333333) {
                        planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.75, "yellow", 7.5));
                    } else {
                        planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.5, "red", 10));
                    }
                    planeCounter++;
                }
            }, 500)
            break;
    }
    document.body.style.background = "url(Images/space.png)"
}
function determineWin() {
    for (let plane of planeArr) {
        if (plane.y > CH + 200) {
            planeArr.splice(planeArr.indexOf(plane), 1)
            winCounter++;
        }
    }
    if (winCounter > 3) {
        clearInterval(newPlanes)
        canvas.removeEventListener("click", fireHotShots);
        planeArr = []
        hotShotsArr = []
        text = "You Lose!"
    }
    if (planeArr.length == 0 && planeCounter == 25) {
        clearInterval(newPlanes)
        canvas.removeEventListener("click", fireHotShots);
        planeArr = []
        hotShotsArr = []
        text = "You Win!"
    }
    if (winCounter < 4 && planeCounter == 25) {
        for (let plane in planeArr) {
            if (plane.y > CH + 200) {
                winfinal = true;
            } else {
                winfinal = false;
                break;
            }
        }
        if (winfinal == true) {
            clearInterval(newPlanes)
            canvas.removeEventListener("click", fireHotShots);
            planeArr = []
            hotShotsArr = []
            text = "You Win!"
        }
    }
}
function mainLoop() {
    canvas.width = window.innerWidth;
    canvas.height = 0.9 * window.innerHeight;
    CW = canvas.width;
    CH = canvas.height;
    player.y = 0.95 * CH;

    for (let plane of planeArr) {
        plane.drawPlane();
        plane.animatePlane();
    }

    drawHotShots();
    drawPlayer();
    detectHits();
    determineWin();
    
    backgroundPos += backgroundScroll;
    document.body.style.backgroundPosition = "0px " + backgroundPos + "px";
    requestAnimationFrame(mainLoop);
}
function typeText() {
    ctx.font = "70px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, CW / 2, CH / 2);
    requestAnimationFrame(typeText)
}
//Drawing & Animating: Program Flow
window.onload = function () {
    backgroundMusic.play();
}
mainLoop();
typeText();
let newPlanes = setInterval(function newPlanes() {
    if (planeCounter < 25) {
        planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
        planeCounter++;
    }
}, 1000)
canvas.addEventListener("mousemove", movePlayer)
canvas.addEventListener("click", fireHotShots)
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        escCounter++;
        if (escCounter % 2 != 0) {
            canvas.removeEventListener("mousemove", movePlayer);
            clearInterval(newPlanes)
            canvas.removeEventListener("click", fireHotShots);
            shotsVelocity = 0;
            ctx.clearRect(0, 0, CW, CH);
            backgroundScroll = 0;
            text = "Paused";
            backgroundMusic.pause()
            for (let plane of planeArr) {
                plane.speed = 0;
            }
        } else {
            backgroundMusic.play()
            switch (levelNum) {
                case 1:
                    newPlanes = setInterval(function newPlanes() {
                        if (planeCounter < 25) {
                            planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                            planeCounter++;
                        }
                    }, 1000)
                    break;
                case 2:
                    newPlanes = setInterval(function newPlanes() {
                        if (planeCounter < 25) {
                            planeDecider = Math.random()
                            if (planeDecider > 0.5) {
                                planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                            } else {
                                planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.75, "yellow", 7.5));
                            }
                            planeCounter++;
                        }
                    }, 650)
                    break;
                case 3:
                    newPlanes = setInterval(function newPlanes() {
                        if (planeCounter < 25) {
                            planeDecider = Math.random()
                            if (planeDecider > 0.666666) {
                                planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                            } else if (planeDecider > 0.3333333) {
                                planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.75, "yellow", 7.5));
                            } else {
                                planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.5, "red", 10));
                            }
                            planeCounter++;
                        }
                    }, 500)
                    break;
            }
            canvas.addEventListener("mousemove", movePlayer)
            canvas.addEventListener("click", fireHotShots);
            shotsVelocity = 10;
            cancelAnimationFrame(typeText)
            backgroundScroll = 1;
            if (planeCounter == 25) {
                text = "You win!";
            } else {
                text = "";
            }
            for (let planeTwo of planeArr) {
                if (planeTwo.color == "green") {
                    planeTwo.speed = 5;
                } else if (planeTwo.color == "yellow") {
                    planeTwo.speed = 7.5;
                } else {
                    planeTwo.speed = 10;
                }
            }
        }
    }
};
