<!DOCTYPE html>

<html>
<body>
<?php
$x = $_POST["value"];
$numArray = array(1, 2, 3, 4, 5);
shuffle($numArray);
if($numArray[$x] < 2 && $numArray[$x] >= 0){
    echo "The number is too low!"."<br><br>"."<button onclick='redirectToGuess();'>Try Again!</button>"."<script>function redirectToGuess(){window.location.href = 'http://localhost/GuessingGame-PHP-Edition.html';}</script>";
}
else if($numArray[$x] > 2){
    echo "The number is too High!"."<br><br>"."<button onclick='redirectToGuess();'>Try Again!</button>"."<script>function redirectToGuess(){window.location.href = 'http://localhost/GuessingGame-PHP-Edition.html';}</script>";
};
if($numArray[$x] === 2){
    echo "correct!";
}

?>
</body>
</html>