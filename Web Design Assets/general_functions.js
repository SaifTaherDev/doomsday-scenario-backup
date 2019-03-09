//---------------A---------------//


//---------------B---------------//


//---------------C---------------//


//---------------D---------------//


//---------------E---------------//


//---------------F---------------//


//---------------G---------------//

//generate a random letter
(function(){
    function generateRandomLetter(){
        let num = 0;
        while (num < 65 || num > 90) {
            num = Math.random() * (90 - 65) + 65;
        } 
        console.log(`The letter is: ${String.fromCharCode(num)}`);
    }
})()

//---------------H---------------//


//---------------I---------------//


//---------------J---------------//


//---------------K---------------//


//---------------L---------------//


//---------------M---------------//


//---------------N---------------//


//---------------O---------------//


//---------------P---------------//
//prompt for name in multiplayer games

(function () {
    let playerNames = [];
    let nameCounter = 0;
    let playerNum; // number of players

function promptName() {
    playerName = prompt(`Please enter the name of player ${nameCounter + 1}: `);
    if (nameCounter < playerNum) {  z
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
                alert("This name has been already entered! Please enter a adifferent name!");
                reset();
                return false;
            }
        }
        if (name.length >= 3) {
            if (name.length <= 7) {
                playerNames[nameCounter - 1] = name;
                if (nameCounter < playerNum) {
                    promptName();
                } else {
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
})()

//---------------Q---------------//


//---------------R---------------//


//---------------S---------------//


//---------------T---------------//


//---------------U---------------//


//---------------V---------------//


//---------------W---------------//


//---------------X---------------//


//---------------Y---------------//


//---------------Z---------------//

