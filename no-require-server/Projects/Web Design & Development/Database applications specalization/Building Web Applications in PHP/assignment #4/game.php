<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link type="text/css" rel="stylesheet" href="#" />
    <meta charset="utf-8" />
    <title>Rock, Paper, Scissors!</title>
    <style>
    body{
        font-family:calibri;
    }
    h1{
        font-size:5em;
    }
    p{
        font-size:2em;
    }
    #startegyChoice{
        border-radius:0.3em;
    }
    </style>
</head>
<body>
    <?php
    if((md5($_POST['pass']) == "b116dacbaf40834946b545f8a6f131e0")){
        echo "<h1>Rock Paper Scissors</h1>
        <p>Welcome: ". $_POST['name']."</p>";
    }
    else{
        echo "<script>window.onload = function(){window.location.href='RPSlogin.html'}</script>";
    }
    ?>
    <select id="startegyChoice">
        <option value="rock">Rock</option>
        <option value="paper">Paper</option>
        <option value="scissors">Scissors</option>
    </select>
    <button onclick="updateValue()">Update your strategy</button>
    <button onclick="playFunction()">Play!</button>
    <button onclick="redirectLogin()">Log out</button>
    <!--Start Of JavaScript Code-->
    <script>
        var playsPossible = ["rock", "paper", "scissors"];
        var listChoice = document.body.querySelector("#startegyChoice");

        var yourPlay = listChoice.value;
    function redirectLogin(){
        window.location.href = "RPSlogin.html"
    }
    function playFunction(){
        switch(yourPlay){
            case "invalid":
            alert('Choose a strategy!');
            break;
            case "rock":
            playBot();
            break;
            case "paper":
            playBot();
            break;
            case "scissors":
            playBot();
            break;
    }
    }

    function playBot(){
       var random = Math.round(Math.random()*2);
       var botPlay = playsPossible[random];
       if(yourPlay == "rock" && botPlay == "scissors"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "You Win!")
       }
       if(yourPlay == "scissors" && botPlay == "scissors"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "It's a tie!")
       }
       if(yourPlay == "paper" && botPlay == "scissors"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "You lose!")
       }
       if(yourPlay == "rock" && botPlay == "paper"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "You lose!")
       }
       if(yourPlay == "scissors" && botPlay == "paper"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "You Win!")
       }
       if(yourPlay == "paper" && botPlay == "paper"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "It's a tie!")
       }
       if(yourPlay == "rock" && botPlay == "rock"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "It's a tie!")
       }
       if(yourPlay == "scissors" && botPlay == "rock"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "You lose!")
       }
       if(yourPlay == "paper" && botPlay == "rock"){
           alert("The Computer has chosen: " + botPlay + ". " + "You've chosen: " + yourPlay + ". " + "You Win!")
       }
    };
    function updateValue(){
        yourPlay = listChoice.value;
        console.log("updated!")
    }
    </script>
</body>
</html>