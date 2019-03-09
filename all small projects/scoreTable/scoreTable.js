(function mainContainerIIFE() {
    let nameRow = document.body.querySelector("#nameRow");
    let valRow = document.body.querySelector("#valRow");
    let nameCells = document.body.querySelectorAll("table tr th");
    let valCells = document.body.querySelectorAll("table tr td");
    let inputArr = document.body.querySelectorAll("table tr th input");
    let addButtonsArr = document.body.querySelectorAll("table tr td .addButton");
    let subButtonsArr = document.body.querySelectorAll("table tr td .subButton");
    let addColButton = document.body.querySelector("#addCol");
    let subColButton = document.body.querySelector("#subCol");
    let scoreArr = [];
    let elemCounter = 0;

    (function manageElementsIIFE() {
        function refresh() {
            nameRow = document.body.querySelector("#nameRow");
            valRow = document.body.querySelector("#valRow");
            nameCells = document.body.querySelectorAll("table tr th");
            valCells = document.body.querySelectorAll("table tr td");
            inputArr = document.body.querySelectorAll("table tr th input");
            addButtonsArr = document.body.querySelectorAll("table tr td .addButton");
            subButtonsArr = document.body.querySelectorAll("table tr td .subButton");

            for (let name of nameCells) {
                name.style.width = ((1 / nameCells.length) * 100) + "vw";
            }
            for (let val of valCells) {
                val.style.width = ((1 / nameCells.length) * 100) + "vw";
            }

            addButtonsArr.forEach(function(elem) {
                elem.addEventListener("click", callIncrement);
            });
            subButtonsArr.forEach(function(elem) {
                elem.addEventListener("click", callDecrement);
            });
        }

        function addCol() {
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

            addButton.setAttribute("data-index", JSON.stringify(elemCounter));
            subButton.setAttribute("data-index", JSON.stringify(elemCounter));
            addButton.setAttribute("class", "addButton");
            subButton.setAttribute("class", "subButton");

            refresh();

            scoreArr.push(0);
            elemCounter++;
        }

        function removeCol() {
            nameRow.removeChild(nameCells[nameCells.length - 1]);
            valRow.removeChild(valCells[valCells.length - 1]);
            scoreArr.splice(scoreArr.length - 1, 1);
            refresh();
            elemCounter--;
        }

        addColButton.addEventListener("click", function() {
            if (nameCells.length < 8) {
                addCol();
            }
        })
        subColButton.addEventListener("click", function() {
            if (nameCells.length > 0) {
                removeCol();
            }
        })

        function callIncrement() {
            incrementScore(parseInt(this.dataset.index));
            refresh();
        }

        function callDecrement() {
            decrementScore(parseInt(this.dataset.index));
            refresh();
        }

        function incrementScore(index) {
            scoreArr[index] = scoreArr[index] + 1;
            valCells[index].innerHTML = `${scoreArr[index]}${valCells[index].innerHTML.substring(JSON.stringify(Math.abs(scoreArr[index] - 1)).length, valCells[index].length)}`;
        }

        function decrementScore(index) {
            if (scoreArr[index] > 0) {
                scoreArr[index] -= 1;
            }
            valCells[index].innerHTML = `${scoreArr[index]}${valCells[index].innerHTML.substring(JSON.stringify(Math.abs(scoreArr[index] + 1)).length, valCells[index].length)}`;
        }
    })()
})()