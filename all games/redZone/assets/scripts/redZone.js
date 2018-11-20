(function mainContainer(undefined) {
    let canvas = document.body.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 0.9 * screen.width;
    canvas.height = 0.9 * screen.height;
    let CW = canvas.width;
    let CH = canvas.height;
    canvas.style.top = (screen.height / 2) - (canvas.height / 2) + "px";
    canvas.style.left = (screen.width / 2) - (canvas.width / 2) + "px";
    let mousePosXCorrection = canvas.offsetLeft;
    let mousePosYCorrection = canvas.offsetTop;

    let backMusic = new Howl({
        src: "assets/backMusic.mp3",
        loop: true
    })
    backMusic.play();

    let dotArr = [];
    let dotSize = 50
    let dotDistance = 100;
    let borderDistance = 50;
    let dotCounter = 0;
    let zoneRadius = 0.25 * CW;
    let text = "";
    let textBool = false;
    let gameBreak = false;

    let spawnRate, dotNumber, dotDuartion, formRate;

    let player = {
        posX: CW / 2,
        posY: CH / 2,
        radius: 20,

        drawPlayer() {
            ctx.save();
            ctx.translate(this.posX, this.posY);
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },

        movePlayer(x, y) {
            if (this.validatePosition(x, y)) {
                this.posX = x;
                this.posY = y;
            } else {
                let angle = Math.atan2(y - (CH / 2), x - (CW / 2));
                this.posX = (CW / 2) + Math.cos(angle) * zoneRadius;
                this.posY = (CH / 2) + Math.sin(angle) * zoneRadius;
            }
        },

        validatePosition(x, y) {
            let playerDistance = Math.sqrt(Math.pow((CW / 2) - x, 2) + Math.pow((CH / 2) - y, 2));
            if (playerDistance < zoneRadius) {
                return true;
            }
            return false;
        }
    }

    function callMove(e) {
        player.movePlayer(e.clientX - mousePosXCorrection, e.clientY - mousePosYCorrection);
    }

    class dot {
        constructor(posX, posY) {
            this.posX = posX;
            this.posY = posY;
            this.radius = dotSize;
            this.rgb = [255, 255, 0];
            this.opacity = 1;
            this.phaseOut = false;
        }

        drawDot() {
            ctx.save();
            ctx.translate(this.posX, this.posY);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.restore();
        }

        detectPlayer() {
            if (this.rgb[1] < 0) {
                if (Math.sqrt(Math.pow(player.posX - this.posX, 2) + Math.pow(player.posY - this.posY, 2)) < this.radius) {
                    clearInterval(generateInter);
                    textBool = true;
                    text = "You've Lost!";
                    document.body.addEventListener("click", function() { location.reload(); })
                    dotArr = [];
                }
            }
        }

        intro() {
            this.rgb[1] -= formRate;
        }
        outro() {
            this.opacity -= 0.0333333333;
        }
    }

    function mainLoop() {

        function drawCircle() {
            ctx.save();
            ctx.translate(CW / 2, CH / 2);
            ctx.strokeStyle = "black";
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(0, 0, zoneRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        }

        function drawDots() {
            for (let dot of dotArr) {
                dot.drawDot();
                dot.detectPlayer();
                dot.intro();
                if (dot.phaseOut) {
                    dot.outro();
                }
            }
        }

        function writeText(text) {
            ctx.save();
            ctx.translate(CW / 2, CH / 2);
            ctx.font = "125px sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(text, 0, 0);
            ctx.font = "40px Calibri";
            ctx.fillText("click anywhere to play another game!", 0, 100);
            ctx.restore();
        }

        if (!gameBreak) {
            ctx.clearRect(0, 0, CW, CH);
        }
        drawCircle();
        drawDots();
        player.drawPlayer();
        if (textBool) {
            writeText(text);
        }
        requestAnimationFrame(mainLoop);
    }

    function addDot() {

        function generateDot() {
            let center_x = CW / 2;
            let center_y = CH / 2;
            let angle = Math.random() * 360;
            let distance = Math.random() * (zoneRadius);

            return [center_x + Math.cos(angle) * distance, center_y + Math.sin(angle) * distance, center_x + Math.cos(angle) * zoneRadius, center_y + Math.sin(angle) * zoneRadius]
        }

        function verifyDotPosition(xPar, yPar, xBorder, yBorder) {
            if (Math.sqrt(Math.pow(xPar - xBorder, 2) + Math.pow(yPar - yBorder, 2)) < borderDistance) {
                return false;
            }
            for (let dot of dotArr) {
                if (Math.sqrt(Math.pow(xPar - dot.posX, 2) + Math.pow(yPar - dot.posY, 2)) < dotDistance) {
                    return false;
                }
            }
            dotCounter++;
            return true;
        }

        function deleteDot() {
            setTimeout(function() {
                dotArr[0].phaseOut = true;
                setTimeout(function() {
                    dotArr.splice(0, 1);
                }, 500)
            }, dotDuartion)

        }

        let newDots = generateDot();
        let x1 = newDots[0];
        let y1 = newDots[1];
        let x2 = newDots[2];
        let y2 = newDots[3];

        while (!verifyDotPosition(x1, y1, x2, y2)) {
            newDots = generateDot();
            x1 = newDots[0];
            y1 = newDots[1];
            x2 = newDots[2];
            y2 = newDots[3];
        }

        if (dotCounter <= dotNumber) {
            dotArr.push(new dot(x1, y1));
            deleteDot();
        } else {
            textBool = true;
            text = "You've Won!"
            document.body.addEventListener("click", function() { location.reload(); })
        }
    }

    function promptDifficutly() {
        let promptAnswer = prompt("Please enter the difficulty that would suit you (1 - 15): ");
        evaluateDifficullty(parseFloat(promptAnswer));
    }

    function evaluateDifficullty(answer) {
        if (answer == 0) {
            spawnRate = 100
            dotNumber = 1000;
            dotDuartion = 10000;
            formRate = (60 / dotDuartion) * 100;
            gameBreak = true;
            textBool = false;
            text = "YoU'VE BrOKe ThE CoDE!"
            textBool = true;
            let generateInter = setInterval(addDot, spawnRate);
            setInterval(function() {
                backMusic.play();
            }, 500)
        } else if (answer <= 15 && answer >= 0 && Number.isInteger(answer)) {
            spawnRate = 2000 / answer;
            dotNumber = answer * 10;
            dotDuartion = 1000 + (answer * 100);
            formRate = (60 / dotDuartion) * 100;
        } else {
            alert("please enter a valid difficulty!");
            promptDifficutly();
        }
    }

    mainLoop();
    promptDifficutly()
    let generateInter = setInterval(addDot, spawnRate);
    canvas.addEventListener("mousemove", callMove);

})()