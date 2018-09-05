{
    //functions & classes definitions
    var radius = 5;
    var rectArrLaneOne = [];
    var rectArrLaneTwo = [];
    var rectArrLaneThree = [];
    var rectArrLaneFour = [];
    var rectArrLaneFive = [];
    var rectArrLaneSix = [];
    var rectArrLaneSeven = [];
    var rectArrLaneEight = [];
    var rectArrLaneNine = [];
    var rectArrLaneTen = [];
    var rectArrLaneEleven = [];

    var rectArrLaneTwelve = [];
    var rectArrLaneThirteen = [];
    var rectArrLaneFourteen = [];
    var rectArrLaneFifteen = [];
    var rectArrLaneSixteen = [];
    var rectArrLaneSeventeen = [];
    var rectArrLaneEighteen = [];
    var rectArrLaneNineteen = [];
    var rectArrLaneTwenty = [];
    var rectArrLaneTwentyOne = [];
    var rectArrLaneTwentyTwo = [];

    var canvas = document.body.querySelector("#canvasOne");
    var ctx = canvas.getContext("2d");
    var canvasTwo = document.body.querySelector("#canvasTwo");
    var ctxTwo = canvasTwo.getContext("2d");
    class roundRect {
        constructor(rectX, rectY, rectHeight, rectWidth, stroke, fill, c) {
            this.rectX = rectX;
            this.rectY = rectY;
            this.rectHeight = rectHeight;
            this.rectWidth = rectWidth;
            this.stroke = stroke;
            this.fill = fill;
            this.c = c;
        }
    }
    function createRect(rectX, rectY, rectHeight, rectWidth, stroke, fill, c, arr) {
        arr.push(new roundRect(rectX, rectY, rectHeight, rectWidth, stroke, fill, c));
        drawRect(arr[0].rectX, arr[0].rectY, arr[0].rectHeight, arr[0].rectWidth, arr[0].stroke, arr[0].fill, arr[0].c);
    }
    function drawRect(rectX, rectY, rectHeight, rectWidth, stroke, fill, c) {
        c.save();
        c.translate(rectX, rectY)
        c.clearRect(-10, -10, 10, 10);
        c.beginPath();
        c.strokeStyle = stroke;
        c.fillStyle = fill;
        c.moveTo(rectWidth / 2, 0);
        c.arcTo(rectWidth, 0, rectWidth, rectHeight, radius);
        c.arcTo(0 + rectWidth, rectHeight, 0, rectHeight, radius);
        c.arcTo(0, rectHeight, 0, 0, radius);
        c.arcTo(0, 0, rectWidth / 2, 0, radius);
        c.closePath();
        c.fill();
        c.stroke();
        c.restore()
    }
    function moveRect(rect, ySpeed, c) {
        if (rect.rectY > 905) {
            rect.rectY = -50;
        }
        else {
            rect.rectY += ySpeed;
        }
        c.save()
        c.translate(rect.rectX, rect.rectY)
        drawRect(rect.rectX, rect.rectY, rect.rectHeight, rect.rectWidth, rect.stroke, rect.fill, rect.c);
        c.restore()
    }
    var counter, counterTwo, counterThree;
    for (counter = 0, counterTwo = 0, counterThree = 0; counter < 980; counter += 20, counterTwo += 40, counterThree += 60) {
        createRect(30, -35 - counterTwo, 50, 8, "transparent", "#C60139", ctx, rectArrLaneTwo);
        createRect(50, -35 - counterThree, 70, 8, "transparent", "#FFC300", ctx, rectArrLaneThree);
        createRect(70, -35 - counterTwo, 50, 8, "transparent", "#C60139", ctx, rectArrLaneFour);
        createRect(110, -35 - counterThree, 70, 8, "transparent", "#571845", ctx, rectArrLaneEleven);
        createRect(150, -35 - counterTwo, 50, 8, "transparent", "#C60139", ctx, rectArrLaneSeven);
        createRect(170, -35 - counterThree, 70, 8, "transparent", "#FFC300", ctx, rectArrLaneEight);
        createRect(190, -35 - counterTwo, 50, 8, "transparent", "#C60139", ctx, rectArrLaneNine);

        createRect(30, -35 - counterTwo, 50, 8, "transparent", "#C60139", ctxTwo, rectArrLaneThirteen);
        createRect(50, -35 - counterThree, 70, 8, "transparent", "#FFC300", ctxTwo, rectArrLaneFourteen);
        createRect(70, -35 - counterTwo, 50, 8, "transparent", "#C60139", ctxTwo, rectArrLaneFifteen);
        createRect(110, -35 - counterThree, 70, 8, "transparent", "#571845", ctxTwo, rectArrLaneSeventeen);
        createRect(150, -35 - counterTwo, 50, 8, "transparent", "#C60139", ctxTwo, rectArrLaneNineteen);
        createRect(170, -35 - counterThree, 70, 8, "transparent", "#FFC300", ctxTwo, rectArrLaneTwenty);
        createRect(190, -35 - counterTwo, 50, 8, "transparent", "#C60139", ctxTwo, rectArrLaneTwentyOne);
    }
    function mainLoop() {
        canvas.width = window.innerWidth / 3;
        canvas.height = window.innerHeight * 0.9975;
        resize(canvas);
        canvasTwo.width = window.innerWidth / 3;
        canvasTwo.height = window.innerHeight * 0.9975;
        resize(canvasTwo);
        ctx.clearRect(0, 0, canvasTwo.width, canvasTwo.height);
        ctxTwo.clearRect(0, 0, canvasTwo.width, canvasTwo.height);

        for (var rect of rectArrLaneOne) {
            moveRect(rect, 5, ctx);
        }
        for (var rect of rectArrLaneTwo) {
            moveRect(rect, 4, ctx);
        }
        for (var rect of rectArrLaneThree) {
            moveRect(rect, 2, ctx);
        }
        for (var rect of rectArrLaneFour) {
            moveRect(rect, 4, ctx);
        }
        for (var rect of rectArrLaneFive) {
            moveRect(rect, 5, ctx);
        }
        for (var rect of rectArrLaneEleven) {
            moveRect(rect, 2, ctx);
        }
        for (var rect of rectArrLaneSix) {
            moveRect(rect, 5, ctx);
        }
        for (var rect of rectArrLaneSeven) {
            moveRect(rect, 4, ctx);
        }
        for (var rect of rectArrLaneEight) {
            moveRect(rect, 2, ctx);
        }
        for (var rect of rectArrLaneNine) {
            moveRect(rect, 4, ctx);
        }
        for (var rect of rectArrLaneTen) {
            moveRect(rect, 5, ctx);
        }

        for (var rect of rectArrLaneTwelve) {
            moveRect(rect, 5, ctxTwo);
        }
        for (var rect of rectArrLaneThirteen) {
            moveRect(rect, 4, ctxTwo);
        }
        for (var rect of rectArrLaneFourteen) {
            moveRect(rect, 2, ctxTwo);
        }
        for (var rect of rectArrLaneFifteen) {
            moveRect(rect, 4, ctxTwo);
        }
        for (var rect of rectArrLaneSixteen) {
            moveRect(rect, 5, ctxTwo);
        }
        for (var rect of rectArrLaneSeventeen) {
            moveRect(rect, 2, ctxTwo);
        }
        for (var rect of rectArrLaneEighteen) {
            moveRect(rect, 5, ctxTwo);
        }
        for (var rect of rectArrLaneNineteen) {
            moveRect(rect, 4, ctxTwo);
        }
        for (var rect of rectArrLaneTwenty) {
            moveRect(rect, 2, ctxTwo);
        }
        for (var rect of rectArrLaneTwentyOne) {
            moveRect(rect, 4, ctxTwo);
        }
        for (var rect of rectArrLaneTwentyTwo) {
            moveRect(rect, 5, ctxTwo);
        }
        requestAnimationFrame(mainLoop);
    }
    function resize(canvasElement) {
        window.addEventListener("resize", function () {
            canvasElement.width = window.innerWidth / 3;
            canvasElement.height = window.innerHeight * 0.9975;
        })
    }
    //Start of Program flow
    mainLoop();
}