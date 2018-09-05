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

        $mainType = $_GET['mainType'];
        $personSelector = $_GET['personSelector'];
        $activitySelector = $_GET['totalDataActivity'];

        $grandTotalAmount = 0;

        function grandTotal($person,$category){
            global $pdo;
            global $grandTotalAmount;

            $stmt = $pdo->query("SELECT SUM($person.$category) FROM $person");
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $grandTotalAmount += array_sum($row);
            };
        };
        
        if($mainType == "grandTotal"){
            grandTotal(saif,Food);
            grandTotal(ahmad,Food);
            grandTotal(boody,Food);

            grandTotal(saif,Stationery_items);
            grandTotal(ahmad,Stationery_items);
            grandTotal(boody,Stationery_items);

            grandTotal(main_expenses,Bread);
            grandTotal(main_expenses,Medicine);
            grandTotal(main_expenses,Ahmad_Lessons);
            grandTotal(main_expenses,Food_Orders);
            grandTotal(main_expenses,Water_Gas_Electricity);
            grandTotal(main_expenses,Telephone_Internet_15);
            grandTotal(main_expenses,Others);

            echo("<div class='flexContainer'><table><tr><th>Total:</th><td>".$grandTotalAmount."</td></tr></table></div><div class='flexContainer'><div onclick='goBack();' id='collectMoreData'>Collect More Data!</div></div>");
        }else if($mainType == "by_activity"){
            if($personSelector == "ahmad-saif-boody"){
                grandTotal(saif,$activitySelector);
                grandTotal(ahmad,$activitySelector);
                grandTotal(boody,$activitySelector);
                echo("<div class='flexContainer'><table><tr><th>".$activitySelector." Total:</th><td>".$grandTotalAmount."</td></tr></table></div><div class='flexContainer'><div onclick='goBack();' id='collectMoreData'>Collect More Data!</div></div>");
            }if($personSelector == "main_expenses"){
                grandTotal(main_expenses,$activitySelector);
                echo("<div class='flexContainer'><table><tr><th>".$activitySelector." Total:</th><td>".$grandTotalAmount."</td></tr></table></div><div class='flexContainer'><div onclick='goBack();' id='collectMoreData'>Collect More Data!</div></div>");
            }else{
                grandTotal($personSelector,$activitySelector);
                echo("<div class='flexContainer'><table><tr><th>$personSelector</th><th>".$activitySelector." Total:</th><td>".$grandTotalAmount."</td></tr></table></div><div class='flexContainer'><div onclick='goBack();' id='collectMoreData'>Collect More Data!</div></div>");
            };
        }
        ?>
		<!--Start Of JavaScript Code -->
		<script>
        function goBack(){
            window.location.href='money.php';
        }
        </script>
	</body>
</html>