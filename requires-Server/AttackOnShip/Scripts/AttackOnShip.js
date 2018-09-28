//Drawing & Animating: Classes & Variables Definitions
const levelDiv = document.body.querySelector("#levelDiv");
const levelDivSpans = document.body.querySelectorAll("#levelDiv span");
const canvas = document.body.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");
const boomFrames = document.body.querySelectorAll("img");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let CW = canvas.width;
let CH = canvas.height;
let planeArr = [];
let hotShotsArr = [];
let enemyHotShotsArr = []
let planeCollisionCounter = 0;
let planeCounter = 0;
let escCounter = 0;
let shotsVelocity = 10;
let enemyShotsVelocity = -10;
let text = "";
let planeDecider = 0;
let levelNum = 1;
let backgroundPos = 0;
let backgroundScroll = 1;
let winCounter = 0;
let winfinal;
let destroyPlaneCounter = 0;
let counter = 0;
let counterTwo = 0;
let backgroundMusic = new Howl({
    src: "Music_SoundFX/backgroudMusic.mp3",
    loop: true
})
let plasma = new Howl({
    src: "Music_SoundFX/plasma.mp3"
})
let planeKill = new Howl({
    src: "Music_SoundFX/planeKill.mp3",
    volume : 0.75
})
let playerKill = new Howl({
    src: "Music_SoundFX/playerKill.mp3",
    volume: 1.25
})
class plane {
    constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.counter = 0;
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
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let player = {
    x: CW / 2,
    y: 0.95 * CH,
    counter: 0
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
function drawHotShots(array, speed) {
    for (let shot of array) {
        ctx.save();
        ctx.fillStyle = "white"
        ctx.translate(shot.x, shot.y)
        ctx.fillRect(-10,0,10,20)
        ctx.restore()
        shot.y -= speed;
    }
}
function detectHits() {
    for (let shot of hotShotsArr) {
        planeCollisionCounter = 0;
        for (let plane of planeArr) {
            if (((shot.x - 10) > (plane.x - 40) && (shot.x + 10) < (plane.x + 40) && shot.y < plane.y - 10) || ((shot.x - 10) > (plane.x - 80) && (shot.x + 10) < (plane.x + 80) && shot.y < plane.y - 75)) {
                hotShotsArr.splice(hotShotsArr.indexOf(shot), 1)
                if (plane.y > 100) {
                    if (plane.color == "green") {
                        planeArr.splice(planeCollisionCounter, 1)
                        planeKill.play()
                    } else if (plane.color == "yellow") {
                        plane.counter++;
                        if (plane.counter >= 2) {
                            planeArr.splice(planeCollisionCounter, 1)
                            planeKill.play()
                        }
                    } else {
                        plane.counter++;
                        if (plane.counter >= 3) {
                            planeArr.splice(planeCollisionCounter, 1)
                            planeKill.play()
                        }
                    }
                }   
            }
            planeCollisionCounter++;
        }
    }
    for (let shot of enemyHotShotsArr) {
        if (shot.x - 10 > player.x - 70 && shot.x - 10 < player.x + 70 && shot.y < player.y && shot.y > player.y - 40) {
            enemyHotShotsArr.splice(enemyHotShotsArr.indexOf(shot), 1)
            planeKill.play()
            player.counter++;
        }
        if (player.counter > 3) {
            player.counter = 0;
            playerKill.play()
            text = "You Lose!";
            winLose();
            displayMenu();
            player.y = CH + 200;
        }
    }
}
function movePlayer(e) {
    player.x = e.clientX;
}
function fireHotShots(e) {
    hotShotsArr.push(new hotShot(player.x, 0.95 * CH))
    plasma.play()
}
function fireEnemyHotShots(x, y) {
    enemyHotShotsArr.push(new hotShot(x, y))
    plasma.play()
}
function detectCrashes() {
    for (let plane of planeArr) {
        if (player.x - 20 > plane.x - 60 && player.x - 20 < plane.x + 60 && player.y - 20 < plane.y && player.y > plane.y - 120) {
            playerKill.play()
            text = "You Lose!";
            winLose();
            displayMenu();
            player.y = -200;
        }
    }
}
    function resetGame() {
        if (escCounter % 2 != 0) {
            escCounter++;
            backgroundScroll = 1;
            backgroundMusic.play()
        }
        enemyHotShotsArr = []
        hotShotsArr = []
        player.counter = 0;
        player.y = 0.95 * CH;
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
        clearInterval(newPlanes)
        clearInterval(greenEnemyShoot)
        clearInterval(yellowEnemyShoot)
        clearInterval(redEnemyShoot)
        greenEnemyShoot = setInterval(function () {
            for (let plane of planeArr) {
                if (plane.color == "green") {
                    fireEnemyHotShots(plane.x, plane.y)
                }
            }
        }, 2000)
        yellowEnemyShoot = setInterval(function () {
            for (let plane of planeArr) {
                if (plane.color == "yellow") {
                    fireEnemyHotShots(plane.x, plane.y)
                }
            }
        }, 3000)
        redEnemyShoot = setInterval(function () {
            for (let plane of planeArr) {
                if (plane.color == "red") {
                    fireEnemyHotShots(plane.x, plane.y)
                }
            }
        }, 3500)
    }
    function changeLevel() {
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
                        planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                        planeCounter++;
                    }
                }, 850)
                break;
            case 3:
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
                }, 1000)
                break;
            case 4:
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
                }, 850)
                break;
            case 5:
                newPlanes = setInterval(function newPlanes() {
                    if (planeCounter < 25) {
                        planeDecider = Math.random()
                        if (planeDecider > 0.666666) {
                            planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                        } else if (planeDecider > 0.3333333) {
                            planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.75, "yellow", 7.5));
                        } else {
                            planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.5, "red", 8.5));
                        }
                        planeCounter++;
                    }
                }, 1000)
                break;
            case 6:
                newPlanes = setInterval(function newPlanes() {
                    if (planeCounter < 25) {
                        planeDecider = Math.random()
                        if (planeDecider > 0.666666) {
                            planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 1, "green", 5));
                        } else if (planeDecider > 0.3333333) {
                            planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.75, "yellow", 7.5));
                        } else {
                            planeArr.push(new plane(Math.random() * ((CW - 150) - 150) + 150, -100, 0.5, "red", 8.5));
                        }
                        planeCounter++;
                    }
                }, 850)
                break;
        }
        enemyShotsVelocity = -10;
        player.y = 0.95 * CH;
        hideMenu();
    }
    function winLose() {
        clearInterval(newPlanes)
        canvas.removeEventListener("click", fireHotShots);
        planeArr = []
        hotShotsArr = []
    }
    function displayMenu() {
        levelDiv.style.display = "block";
        for (let span of levelDivSpans) {
            span.style.display = "inline-block";
        }
        canvas.style.cursor = "default"
    }
    function hideMenu() {
        levelDiv.style.display = "none";
        for (let span of levelDivSpans) {
            span.style.display = "none";
        }
        canvas.style.cursor = "none"
    }
    function determineWin() {
        for (let plane of planeArr) {
            if (plane.y > CH + 200) {
                planeArr.splice(planeArr.indexOf(plane), 1)
                winCounter++;
            }
        }
        if (winCounter > 3) {
            winLose();
            text = "You Lose!"
            displayMenu()
        }
        if (planeArr.length == 0 && planeCounter == 25) {
            winLose();
            text = "You Win!"
            displayMenu()
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
                winLose()
                text = "You Win!"
                displayMenu()
            }
        }
    }
    function mainLoop() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        CW = canvas.width;
        CH = canvas.height;

        for (let plane of planeArr) {
            plane.drawPlane();
            plane.animatePlane();
        }

        drawHotShots(hotShotsArr, shotsVelocity);
        drawHotShots(enemyHotShotsArr, enemyShotsVelocity);
        drawPlayer();
        detectHits();
        determineWin();
        detectCrashes();

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
                canvas.removeEventListener("click", fireHotShots);
                clearInterval(newPlanes)
                clearInterval(greenEnemyShoot)
                clearInterval(yellowEnemyShoot)
                clearInterval(redEnemyShoot)
                displayMenu()
                shotsVelocity = 0;
                enemyShotsVelocity = 0;
                ctx.clearRect(0, 0, CW, CH);
                backgroundScroll = 0;
                text = "Paused";
                backgroundMusic.pause()
                for (let plane of planeArr) {
                    plane.speed = 0;
                }
            } else {
                hideMenu()
                backgroundMusic.play()
                changeLevel();
                canvas.addEventListener("mousemove", movePlayer)
                canvas.addEventListener("click", fireHotShots);
                shotsVelocity = 10;
                enemyShotsVelocity = -10;
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
                greenEnemyShoot = setInterval(function () {
                    for (let plane of planeArr) {
                        if (plane.color == "green") {
                            fireEnemyHotShots(plane.x, plane.y)
                        }
                    }
                }, 2000)
                yellowEnemyShoot = setInterval(function () {
                    for (let plane of planeArr) {
                        if (plane.color == "yellow") {
                            fireEnemyHotShots(plane.x, plane.y)
                        }
                    }
                }, 3000)
                redEnemyShoot = setInterval(function () {
                    for (let plane of planeArr) {
                        if (plane.color == "red") {
                            fireEnemyHotShots(plane.x, plane.y)
                        }
                    }
                }, 3500)
            }
        }
}
let greenEnemyShoot = setInterval(function () {
    for (let plane of planeArr) {
        if (plane.color == "green") {
            fireEnemyHotShots(plane.x, plane.y)
        }
    }
}, 2000)
let yellowEnemyShoot = setInterval(function () {
    for (let plane of planeArr) {
        if (plane.color == "yellow") {
            fireEnemyHotShots(plane.x, plane.y)
        }
    }
}, 3000)
let redEnemyShoot = setInterval(function () {
    for (let plane of planeArr) {
        if (plane.color == "red") {
            fireEnemyHotShots(plane.x, plane.y)
        }
    }
}, 3500)