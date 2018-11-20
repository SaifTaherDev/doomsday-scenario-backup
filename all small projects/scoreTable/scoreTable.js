(function mainIIFE() {
    let nameRow = document.body.querySelector("#nameRow");
    let valRow = document.body.querySelector("#valRow");
    let nameCells = document.body.querySelectorAll("table tr th");
    let valCells = document.body.querySelectorAll("table tr td");
    let inputArr = document.body.querySelectorAll("table tr th input");
    let scoreArr = [];
    let elemCounter = -1;

    function addCol() {
        elemCounter++;
        let tHeading = document.createElement("th");
        let input = document.createElement("input");
        tHeading.appendChild(input);
        nameRow.appendChild(tHeading);

        let tCell = document.createElement("td");
        let text = document.createTextNode("0");
        tCell.appendChild(text);
        tCell.innerHTML += "<br>";

        let addButton = document.createElement("button");
        let text2 = document.createTextNode("+");
        addButton.appendChild(text2);

        let subButton = document.createElement("button");
        let text3 = document.createTextNode("-");
        subButton.appendChild(text3);

        tCell.appendChild(addButton);
        tCell.appendChild(subButton);

        valRow.appendChild(tCell);

        nameCells = document.body.querySelectorAll("table tr th");
        valCells = document.body.querySelectorAll("table tr td");
        inputArr = document.body.querySelectorAll("table tr th input");

        addButton.setAttribute("data-index", JSON.stringify(elemCounter));
        subButton.setAttribute("data-index", JSON.stringify(elemCounter));
        addButton.setAttribute("onclick", "incrementScore(parseInt(this.dataset.index));");
        subButton.setAttribute("onclick", "decrementScore(parseInt(this.dataset.index));");


        for (let name of nameCells) {
            name.style.width = ((1 / nameCells.length) * 100) + "vw";
        }
        for (let val of valCells) {
            val.style.width = ((1 / nameCells.length) * 100) + "vw";
        }
        scoreArr.push(0);
    }

    function removeCol() {
        nameRow.removeChild(nameCells[nameCells.length - 1]);
        valRow.removeChild(valCells[valCells.length - 1]);
        scoreArr.splice(scoreArr.length - 1, 1);
        nameCells = document.body.querySelectorAll("table tr th");
        valCells = document.body.querySelectorAll("table tr td");
        inputArr = document.body.querySelectorAll("table tr th input");
        elemCounter--;
    }

    function incrementScore(index) {
        scoreArr[index] += 1;
        valCells[index].innerHTML = `${scoreArr[index]}${valCells[index].innerHTML.substring(JSON.stringify(Math.abs(scoreArr[index] - 1)).length, valCells[index].length)}`;
    }

    function decrementScore(index) {
        if (scoreArr[index] > 0) {
            scoreArr[index] -= 1;
        }
        valCells[index].innerHTML = `${scoreArr[index]}${valCells[index].innerHTML.substring(JSON.stringify(Math.abs(scoreArr[index] + 1)).length, valCells[index].length)}`;
    }
})()