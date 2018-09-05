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
    $personData = $_GET['personSelectorData'];
    $categoryData = $_GET['categoryData'];
    $date = $_GET['date'];

    $stmt2 = $pdo->query("SELECT SUM($categoryData) FROM $personData WHERE Day = '$date'");
    while($row = $stmt2->fetch(PDO::FETCH_ASSOC)){
       echo("<div class='flexContainer'><table><tr><th>".$personData."</th><th>".$categoryData."</th><td>".array_sum($row)."</td></tr></table></div><div class='flexContainer'><div onclick='goBack();' id='collectMoreData'>Collect More Data!</div></div>");
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