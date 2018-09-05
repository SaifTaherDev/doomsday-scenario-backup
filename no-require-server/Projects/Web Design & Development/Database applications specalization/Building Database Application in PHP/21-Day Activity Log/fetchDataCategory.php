<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
 <head>
	<meta charset="utf-8" />
	<title>Results</title>
    <link type="text/css" rel="stylesheet" href="resultStyling.css">
	</head>
	<body>
    <?php
    $pdo = new pdo('mysql:host=localhost;port=3306;dbname=financial_activity_log','SaifTaher_Dev', 'Manny2009_34_Art');
    $category = $_GET['categoryData'];
    $date = $_GET['date'];
    $person = $_GET['personSelectorData'];
    $totalSum = 0;

    if($person == "ahmad/saif/boody"){
        $stmt = $pdo->query("SELECT SUM(saif.$category) FROM saif WHERE Day = '$date' UNION SELECT SUM(ahmad.$category) FROM ahmad WHERE Day = '$date' UNION SELECT SUM(boody.$category) FROM boody WHERE Day = '$date'");
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
       $totalSum = $totalSum + array_sum($row);
    }
    echo("<div class='flexContainer'><table><th>".$category."</th><td>".$totalSum."</td></tr></table></div><div class='flexContainer'><div onclick='goBack();'id='collectMoreData'>Collect More Data!</div></div>");
}else{
    $stmt = $pdo->query("SELECT SUM($category) FROM main_expenses WHERE Day='$date'");
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
       echo("<div class='flexContainer'><table><th>".$category."</th><td>".array_sum($row)."</td></tr></table></div><div class='flexContainer'><div onclick='goBack();'id='collectMoreData'>Collect More Data!</div></div>");
    }
}
         ?>
		<!--Start Of JavaScript Code-->
		<script>
        function goBack(){
            window.location.href='money.php';
        }
        </script>
	</body>
</html>