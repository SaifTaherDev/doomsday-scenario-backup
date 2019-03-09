(function mainIIFE() {
    const canvas = document.body.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = screen.width;
    canvas.height = screen.height;
    const CW = canvas.width;
    const CH = canvas.height;
    
    const dashWidth = 6;
    const dashHeight = 14;
    const dashNum = 31;
    let dashArr = [];
    
    const barWidth = 20;
    const barHeight = 80;
    let barArr = [];
    
    let playerNames = [];
    let nameCounter = 0;
    let playerNum = 2;
    let botCounter = 1;
    const scoreLimit = 10;
    
    let scoreOne = 0;
    let scoreTwo = 0;
    let interfaceBool = true;
    let winnerBool = false;
    let winner;
    let pauseCounter = 0;
    let pauseBool = false;
    let collideBool = true;

    let botVals;
    
    const beep = new Howl({
        src: "../assets/beep.mp3"
    })
    
    function createDashes() {
        for (let counter = 1; counter < dashNum; counter++) {
            dashArr.push(new Dash((CW / 2) - (dashWidth / 2), counter * (CH / dashNum), "white"));
        }
        for (let counter = 1; counter < dashNum; counter++) {
            dashArr.push(new Dash(CW / 10, counter * (CH / dashNum), "grey"));
        }
        for (let counter = 1; counter < dashNum; counter++) {
            dashArr.push(new Dash(CW / 10 * 9 - (dashWidth / 2), counter * (CH / dashNum), "grey"));
        }
    }
    
    function pause() {
        pauseBool = true;
    
        window.removeEventListener("keydown", handleKeyDownOne);
        window.removeEventListener("keyup", handleKeyUpOne);
        window.removeEventListener("keydown", handleKeyDownTwo);
        window.removeEventListener("keyup", handleKeyUpTwo);

        botVals = [barArr[0].getBot(), barArr[0].getSuper(), barArr[1].getBot(), barArr[1].getSuper()];
        for(let bar of barArr){
            bar.changeSuper(false);
            bar.changeBot(false);
        }
    
        barArr[0].changeUpBool(false);
        barArr[0].changeDownBool(false);
        barArr[1].changeUpBool(false);
        barArr[1].changeDownBool(false);
    
        ball.stop();
    
        canvas.style.background = "grey";
    }
    
    function resume() {
        barArr[0].changeBot(botVals[0]);
        barArr[0].changeSuper(botVals[1]);
        barArr[1].changeBot(botVals[2]);
        barArr[1].changeSuper(botVals[3]);

        pauseBool = false;
    
        window.addEventListener("keydown", handleKeyDownOne);
        window.addEventListener("keyup", handleKeyUpOne);
        window.addEventListener("keydown", handleKeyDownTwo);
        window.addEventListener("keyup", handleKeyUpTwo);
    
        ball.resume();
    
        canvas.style.background = "black";
    }
    
    function initiateSMART() {
        setTimeout(function(){
            if(Math.sign(ball.getVelocity()[0]) == -1){
                if(barArr[0].getSuper()){
                    barArr[0].moveSmart();
                }
            }else{
                if(barArr[1].getSuper()){
                    barArr[1].moveSmart();
                }
            }
        }, 300)
    }
    
    function handleKeyDownOne(e){
        keyDownOne(e.keyCode)
    }
    function keyDownOne(keyCode){
        if (keyCode == 87) {
            barArr[0].changeUpBool(true);
            barArr[0].changeDownBool(false);
        } else if (keyCode == 83) {
            barArr[0].changeUpBool(false);
            barArr[0].changeDownBool(true);
        }
    }
    
    function handleKeyUpOne(e){
        keyUpOne(e.keyCode)
    }
    function keyUpOne(keyCode){
        if (keyCode == 87) {
            barArr[0].changeUpBool(false);
        }
        if (keyCode == 83) {
            barArr[0].changeDownBool(false);
        }
    }
    
    
    function handleKeyDownTwo(e){
        keyDownTwo(e.keyCode)
    }
    function keyDownTwo(keyCode){
        if (keyCode == 38) {
            barArr[1].changeUpBool(true);
            barArr[1].changeDownBool(false);
        } else if (keyCode == 40) {
            barArr[1].changeUpBool(false);
            barArr[1].changeDownBool(true);
        }
    }
    
    function handleKeyUpTwo(e){
        keyUpTwo(e.keyCode)
    }
    function keyUpTwo(keyCode){
        if (keyCode == 38) {
            barArr[1].changeUpBool(false);
        }
        if (keyCode == 40) {
            barArr[1].changeDownBool(false);
        }
    }

    function promptName() {
        playerName = prompt(`Please enter the name of player ${nameCounter + 1}: (type "BOT" to make it a bot / type "SUPER" to make it an UNBEATABLE bot)`);
        if (nameCounter < playerNum) {
            nameCounter++;
            evaluatePrompt(playerName);
        }
    }
    
    function evaluatePrompt(name) {
        function reset() {
            nameCounter--;
            promptName();
            return false;
        }
        if (name != "" && name != null) {
            for (let player of playerNames) {
                if (player.toLowerCase() == name.toLowerCase()) {
                    alert("This name has been already entered! Please enter a different name!");
                    reset();
                    return false;
                }
            }
            if (name.length >= 3) {
                if (name.length <= 10) {
                    if (nameCounter < playerNum) {
                        if (name.toLowerCase() == "bot" || name.toLowerCase() == "super") {
                            playerNames[nameCounter - 1] = `bot_${botCounter}`;
                            botCounter++;
                            if(name.toLowerCase() == "super"){
                                barArr.push(new Bar(CW / 10, false, true));
                            }else{
                                barArr.push(new Bar(CW / 10, true, false));
                            }
                        } else {
                            playerNames[nameCounter - 1] = name;
                            barArr.push(new Bar(CW / 10, false));
    
                            window.addEventListener("keydown", handleKeyDownOne);
                            window.addEventListener("keyup", handleKeyUpOne);
                        }
    
                        promptName();
                        return true;
                    } else {
                        if (name.toLowerCase() == "bot" || name.toLowerCase() == "super") {
                            playerNames[nameCounter - 1] = `bot_${botCounter}`;
                            if(name.toLowerCase() == "super"){
                                barArr.push(new Bar(CW / 10 * 9, false, true));
                            }else{
                                barArr.push(new Bar(CW / 10 * 9, true, false));
                            }
                        } else {
                            playerNames[nameCounter - 1] = name;
                            barArr.push(new Bar(CW / 10 * 9, false));
                            window.addEventListener("keydown", handleKeyDownTwo);
                            window.addEventListener("keyup", handleKeyUpTwo);
                        }
                        return true;
                    }
                } else {
                    alert("the length of the name shall not be longer than 7!");
                    reset();
                }
            } else {
                alert("the length of the name shall not be shorter than 3!");
                reset();
            }
        } else {
            alert("Please enter a name!");
            nameCounter--;
            promptName();
            return false;
        }
    }

    class Dash {
        constructor(posX, posY, clr) {
            const _posX = posX;
            const _posY = posY;
            const _CLR = clr;
    
            this.drawDash = function () {
                ctx.save();
                ctx.translate(_posX, _posY);
                ctx.fillStyle = _CLR;
                ctx.fillRect(0, 0, dashWidth, dashHeight);
                ctx.restore();
            }
        }
    }
    
    class Bar {
        constructor(posX, bot, superBot) {
            const _posX = posX;
            let _posY = CH / 2 - barHeight / 2;
            let _BOT = bot;
            let _SUPER = superBot;
            let _moveUpBool = false;
            let _moveDownBool = false;
            let _moveTo;
    
            this.moveSmart = function () {
                setTimeout(function(){
                    let ballPosX = ball.getPosX();
                    let ballPosY = ball.getPosY();
                    let ballVelocityX = ball.getVelocity()[0];
                    let ballVelocityY = ball.getVelocity()[1];
        
                    if (_posX < CW / 2) {
                        while (ballPosX > CW / 10 - 5) {
                            if (ballPosY < 0 || ballPosY > CH) {
                                ballVelocityY *= -1
                            }
                            ballPosX += ballVelocityX;
                            ballPosY += ballVelocityY;
                        }
                    } else {
                        while (ballPosX < CW / 10 * 9 + 5) {
                            if (ballPosY < 0 || ballPosY > CH) {
                                ballVelocityY *= -1
                            }
                            ballPosX += ballVelocityX;
                            ballPosY += ballVelocityY;
                        }
                    }
                    _moveTo = ballPosY;
                }, 100)
            }
    
            this.getSuper = function () {
                return _SUPER;
            }

            this.getBot = function(){
                return _BOT;
            }    
            this.changeSuper = function(val){
                _SUPER = val;
            }
            this.changeBot = function(val){
                _BOT = val;
            }
            this.getPosX = function () {
                return _posX;
            }
            this.getPosY = function () {
                return _posY;
            }
    
            this.reset = function () {
                _posY = CH / 2 - barHeight / 2;
            }
    
            this.getUpBool = function () {
                return _moveUpBool;
            }
            this.getDownBool = function () {
                return _moveDownBool;
            }
    
            this.changeUpBool = function (val) {
                _moveUpBool = val;
            }
            this.changeDownBool = function (val) {
                _moveDownBool = val;
            }
    
            this.drawBar = function () {
                ctx.save();
                ctx.translate(_posX, _posY);
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, barWidth, barHeight);
                ctx.restore();
            }
    
            this.incrementPosY = function (amount) {
                _posY += amount;
            }
            this.moveBar = function () {
                if (_BOT) {
                    if (_posY > ball.getPosY()) {
                        _moveUpBool = true;
                        _moveDownBool = false;
                    } else {
                        _moveUpBool = false;
                        _moveDownBool = true;
                    }
                }else if (_SUPER){
                    if (_posY + (barHeight / 2) > _moveTo) {
                        _moveUpBool = true;
                        _moveDownBool = false;
                    } 
                    if(_posY + (barHeight / 2) < _moveTo){
                        _moveUpBool = false;
                        _moveDownBool = true;
                    }
                }
                if (_moveUpBool) {
                    if (_posY > 0) {
                        this.incrementPosY(-10);
                    }
                } else if (_moveDownBool) {
                    if (_posY < CH - barHeight) {
                        this.incrementPosY(10);
                    }
                }
            }
            this.finalize = function(){
                _BOT = false;
                _SUPER = false;
                _moveUpBool = false;
                _moveDownBool = false;
            }
        }
    
    }
    
    class Ball {
        constructor() {
            let _posX = CW / 2;
            let _posY = CH / 2;
            let _velocityX = [-1, 1][Math.round(Math.random())] * (Math.random() * (10 - 5) + 5);
            let _velocityY = [-1, 1][Math.round(Math.random())] * (Math.random() * (10 - 5) + 5);
            let _lastVelocityX;
            let _lastVelocityY;
            const _radius = 15;
    
            this.drawBall = function () {
                ctx.save();
                ctx.translate(_posX, _posY);
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(0, 0, _radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
    
            this.getPosY = function () {
                return _posY;
            }
            this.getPosX = function () {
                return _posX;
            }
    
            this.moveBall = function () {
                _posX += _velocityX;
                _posY += _velocityY;
            }
    
            this.collideWall = function () {
                if (_posY - _radius < 0 || _posY + _radius > CH) {
                    _velocityY *= -1;
                }
            }
    
            this.collideBar = function () {
                if (_posX - _radius < barArr[0].getPosX() + barWidth && _posX + _radius > barArr[0].getPosX()) {
                    if (_posY > barArr[0].getPosY() && _posY < barArr[0].getPosY() + barHeight) {
                        if (barArr[1].getSuper()) {
                            barArr[1].moveSmart();
                        }
                        _velocityX = -Math.sign(_velocityX) * (Math.random() * (10 - 5) + 5);
                        if (barArr[1].getUpBool()) {
                            if (Math.sign(_velocityY) == -1) {
                                _velocityY *= (Math.random() * (2 - 1) + 1);
                            } else {
                                _velocityY /= (Math.random() * (2 - 1) + 1);
                            }
                        } else if (barArr[1].getDownBool()) {
                            if (Math.sign(_velocityY) == -1) {
                                _velocityY /= (Math.random() * (2 - 1) + 1);
                            } else {
                                _velocityY *= (Math.random() * (2 - 1) + 1);
                            }
                        } else {
                            _velocityY *= (Math.random() * (1 - 0.25) + 0.25);
                        }
                        beep.play();
                        collideBool = false;
                        setTimeout(function () { collideBool = true }, 200);
                    }
                }
    
                if (_posX + _radius > barArr[1].getPosX() && _posX - _radius < barArr[1].getPosX() + barWidth) {
                    if (_posY > barArr[1].getPosY() && _posY < barArr[1].getPosY() + barHeight) {
                        if (barArr[0].getSuper()) {
                            barArr[0].moveSmart();
                        }
                        _velocityX = -Math.sign(_velocityX) * (Math.random() * (10 - 5) + 5);
                        if (barArr[1].getUpBool()) {
                            if (Math.sign(_velocityY) == -1) {
                                _velocityY *= (Math.random() * (2 - 1) + 1);
                            } else {
                                _velocityY /= (Math.random() * (2 - 1) + 1);
                            }
                        } else if (barArr[1].getDownBool()) {
                            if (Math.sign(_velocityY) == -1) {
                                _velocityY /= (Math.random() * (2 - 1) + 1);
                            } else {
                                _velocityY *= (Math.random() * (2 - 1) + 1);
                            }
                        } else {
                            _velocityY *= (Math.random() * (1 - 0.25) + 0.25);
                        }
                        beep.play();
                        collideBool = false;
                        setTimeout(function () { collideBool = true }, 200);
                    }
                }
            }
            this.refresh = function () {
                if (_posX < CW / 10 - 10 || _posX > CW / 10 * 9 + 10) {
                    if (_posX > CW / 10 * 9 + 10) {
                        scoreOne++;
                    } else if (_posX < CW / 10 - 10) {
                        scoreTwo++;
                    }
                    if (Math.max(scoreOne, scoreTwo) == scoreLimit) {
                        window.removeEventListener("keydown", handleKeyDownOne);
                        window.removeEventListener("keyup", handleKeyUpOne);
                        window.removeEventListener("keydown", handleKeyDownTwo);
                        window.removeEventListener("keyup", handleKeyUpTwo);
                        for(let bar of barArr){
                            bar.finalize();
                        }
                        ball.posX = CW / 2;
                        ball.posY = CH / 2;
                        _velocityX = 0;
                        _velocityY = 0;
                        if (scoreOne > scoreTwo) {
                            winner = playerNames[0];
                        } else {
                            winner = playerNames[1];
                        }
                        winnerBool = true;
                        interfaceBool = false;
                    } else {
                        _velocityX = [-1, 1][Math.round(Math.random())] * (Math.random() * (10 - 5) + 5);
                        _velocityY = [-1, 1][Math.round(Math.random())] * (Math.random() * (10 - 5) + 5);
                    }
                    _posX = CW / 2;
                    _posY = CH / 2;
    
                    barArr.forEach(function (bar) { bar.reset(); })
    
                    initiateSMART();
                }
    
            }
    
            this.getVelocity = function () {
                return [_velocityX, _velocityY];
            }
            this.stop = function () {
                _lastVelocityX = _velocityX;
                _lastVelocityY = _velocityY;
                _velocityX = 0;
                _velocityY = 0;
            }
            this.resume = function () {
                _velocityX = _lastVelocityX;
                _velocityY = _lastVelocityY;
            }
        }
    }
    
    let ball = new Ball();

    function drawDashes() {
        dashArr.forEach(function(dash) {
            dash.drawDash();
        })
    }
    
    function drawBars() {
        barArr.forEach(function(bar) { bar.drawBar() })
    }
    
    function typePlayerNames() {
        ctx.save();
        ctx.translate(20, 50);
        ctx.font = "30px retro";
        ctx.fillStyle = "white";
        ctx.fillText(playerNames[0], 0, 0);
        ctx.restore();
    
        ctx.save();
        ctx.translate(CW - (playerNames[1].length * 2.5) * 9, 50);
        ctx.font = "30px retro";
        ctx.fillStyle = "white";
        ctx.fillText(playerNames[1], 0, 0);
        ctx.restore();
    }
    
    function typeScores() {
        ctx.save();
        ctx.translate((CW / 10) * 3, 100);
        ctx.font = "60px retro";
        ctx.fillStyle = "white";
        ctx.fillText(JSON.stringify(scoreOne), 0, 0);
        ctx.restore();
    
        ctx.save();
        ctx.translate((CW / 10) * 7, 100);
        ctx.font = "60px retro";
        ctx.fillStyle = "white";
        ctx.fillText(JSON.stringify(scoreTwo), 0, 0);
        ctx.restore();
    }
    
    function displayWinner() {
        ctx.save();
        ctx.translate(CW / 2, 100);
        ctx.textAlign = "center";
        ctx.font = "80px retro";
        ctx.fillStyle = "white";
        ctx.fillText(`The winner is: ${winner}`, 0, 0);
        ctx.restore();
    }
    
    function mainLoop() {
        ctx.clearRect(0, 0, CW, CH);
        if (interfaceBool) {
            drawDashes();
            typePlayerNames();
            typeScores();
        }
        barArr.forEach(function(bar) { bar.moveBar() });
        drawBars();
        ball.drawBall();
        ball.moveBall();
        if (collideBool) {
            ball.collideBar();
        }
        ball.collideWall();
        ball.refresh();
        if (winnerBool) {
            displayWinner();
        }else if(pauseBool){
            ctx.save();
            ctx.translate(CW / 2, CH / 2);
            ctx.textAlign = "center";
            ctx.font = "100px retro";
            ctx.fillStyle = "white";
            ctx.fillText("paused", 0, 0);
            ctx.restore();
        }
        requestAnimationFrame(mainLoop);
    }

    promptName();
    createDashes();
    mainLoop();
    initiateSMART();

    window.addEventListener("keydown", function(e){
        if(e.keyCode == 27){
            pauseCounter++;
            if(pauseCounter % 2 == 0){
                resume();
            }else{
                pause();
            }
        }
    })
})();