     <!DOCTYPE html>

	<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<style>
        body{
            background: rgba(0, 128, 255,0.6);
            text-align:center;
        }
       #title{
            font-family:calibri;
            font-size:5em;
        }
        .sendSelects{
            font-size:2rem;
            margin-bottom:1em;
            width:12em;
        }
        #amount{
            font-size:1.9rem;
            width:12.5em;
            display:none;
            margin-left:37.5vw;
        }
        #collectDataTitle, #dataTotal{
            font-family:calibri;
            font-size:5em;
        }
        #collectDataFormContainer{
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction:column;
            margin-top:1.6em;
        }
        #collectDataFormContainer input,#collectDataFormContainer select {
            width:23.4vw;
            margin-bottom:0.95em; 
            height:5vh;  
            font-size:2rem;
            display:block;
        }
        #collectDataCategoryFormContainer input, #collectDataCategoryFormContainer select, #collectTotalDataContainer select{
            width:23.4vw;
            height:5vh;  
            font-size:2rem;
            display:block;
        }
        #collectTotalDataContainer{
            display:flex;
            justify-content:center;
            margin-top:1em;
        }
        #collectDataFormContainer{
            width:50vw;
        }
        #collectDataCategoryFormContainer #personSelectorDataCategory{
            margin-top:0.75em;
            margin-bottom:1em;
        }
        #collectDataPersonContainer{
            float:left;
            width:47vw;
        }
        #collectDataCategoryContainer{
            float:right;
            width:47vw;
            display:flex;
            flex-direction:column;
            align-items:center;
        }
        #personDataTitle, #CategoryDataTitle{
            font-family:calibri;
            font-size:1.5em;
            background-color:white;
            border-radius:50em;
            width:100%;
        }
        #dateCategory{
            margin-top:1em;
        }
        #submitTwo, #submitOne, #submitThree, #submitFour{
            background-color: white;
            border-radius: 0.25em;
            font-size: 1.5em;
            text-align: center;
            width: 12vw;
            cursor: pointer;
            transition-duration: 0.25s;
            display:none;
        }
        #submitOne{
            margin-top: -0.25em;
            margin-top:1em;
            margin-left:10em;
        }
        #submitOne:hover, #submitTwo:hover, #submitThree:hover, #submitFour:hover{
            transition-duration:0.25s;
            background-color:black;
            color:white;
        }
        #dateTwo{
            margin-top:1em;
        }
        #finishingLine{
            margin-top:19em;
        }
        #submitThree{
            margin-top:1.25em;
        }
        </style>
		<meta charset="utf-8" />
		<title>FinancialTracker</title>
	</head>
	<body>
    <?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    ?>
    <div id="title">Financial Tracker</div>
    <hr>
    <?php
     $pdo = new pdo('mysql:host=localhost;port=3306;dbname=financial_activity_log','SaifTaher_Dev', 'Manny2009_34_Art');
    ?>
    <?php
        $person="";
        if(isset($_POST['amount']) && isset($_POST['category']) && isset($_POST['person'])){
            $person = $_POST['person'];
            $category = $_POST['category'];

            $sql = "UPDATE $person SET $category = $category + :amount WHERE Day = CURRENT_DATE";
                $stmt = $pdo->prepare($sql);
                $stmt->execute(array(':amount' => $_POST['amount']));
    }
        ?>
        <form method="post" id="sendExpenses">	
		</form>
        <div id="personDiv">
		<select class="sendSelects" name="person" onchange="showPossibilities()" id="person" form="sendExpenses">
        <option value="invalid" selected disabled>Choose a person!</option>
        <option value="main_expenses">Household Expenses</option>
        <option value="ahmad">Ahmad</option>
        <option value="saif">Saif</option>
        <option value="boody">Boody</option>
        </select>
 
        <div id="categoryDiv">
         </div>

         <input autocomplete="off" form="sendExpenses" name="amount" id="amount" type="number" step="0.01" required>   
         <button id="submitOne" onclick="validateForm();submitForm(formOne);">Send Data</button>
         <hr>

         <div id="collectDataDiv">
         <div id="collectDataTitle">Collect Data(By Date)</div>
         <hr>

         <div id="collectDataPersonContainer">
         <div id="personDataTitle">By Person</div>
         <div id="collectDataFormContainer">

         <form method="get" action="fetchData.php" id="collectDataForm">
         </form>

         <input form="collectDataForm" id="date" name="date" type="date">

         <select id="personSelectorData" name="personSelectorData" form="collectDataForm" onchange="showPossibilitiesData()">
         <option value="invalid" selected disabled>Choose a person!</option>
        <option value="main_expenses">Household Expenses</option>
        <option value="ahmad">Ahmad</option>
        <option value="saif">Saif</option>
        <option value="boody">Boody</option>
         </select>

         <div id="categoryContainerData">
         </div>

         <button id="submitTwo" onclick="submitForm(formTwo);">Collect Data</button>
         </div>
         </div>

         <div id="collectDataCategoryContainer">
         <div id="CategoryDataTitle">By Category</div>
         <div id="collectDataCategoryFormContainer">

         <form method="get" action="fetchDataCategory.php" id="collectDataCategoryForm">
         </form>

         <input form="collectDataCategoryForm" id="dateTwo" name="date" type="date">
         <select onchange="showPossibilitiesCategory();" id="personSelectorDataCategory" name="personSelectorData" form="collectDataCategoryForm">
         <option value="invalid" selected disabled>Choose a type of person!</option>
         <option value="ahmad/saif/boody">Ahmad/Saif/Boody</option>
         <option value="main_expenses">household expenses</option>
         </select>
         <div id="categoryContainerDataContainer">
         </div>

         <button id="submitThree" onclick="submitForm(formThree);">Collect Data</button>
         </div>
         </div>
         </div>
         </div>
         <hr id="finishingLine">
         <div id="dataTotal">Collect Data(total)</div>
         <form action="fetchDataTotal.php" method="get" id="collectDataTotalForm">
         </form>

         <div id="collectTotalDataContainer">
         <select form="collectDataTotalForm" name="mainType" id="activity_or_grand" onchange="showPersons();">
         <option selected disabled>Choose the total type!</option>
         <option value="by_activity">By Activity</option>
         <option value="grandTotal">Grand Total</option>
         </select>
         <div id="personContainer"></div>
         <div id="activityContainer"></div>
         <button id="submitFour" onclick="submitForm(formFour);">Collect Data</button>
		<!--Start Of JavaScript Code-->
		<script>
        var personSelector = document.body.querySelector("#person");
        var categorySelector = document.body.querySelector("#category");

        var personSelectorData = document.body.querySelector("#personSelectorData");
        var categorySelectorData = document.body.querySelector("#categorySelectorData");
        var categoryContainerData = document.body.querySelector("#categoryContainerData");

        var categoryContainer = document.body.querySelector("#categoryDiv");
        var math = document.body.querySelector("#amount");
        var mathValue = math.value;

        var submitOne = document.body.querySelector("#submitOne");
        var submitTwo = document.body.querySelector("#submitTwo");
        var submitThree = document.body.querySelector("#submitThree");
        var submitFour = document.body.querySelector("#submitFour");

        var formOne = document.body.querySelector("#sendExpenses");
        var formTwo = document.body.querySelector("#collectDataForm");
        var formThree = document.body.querySelector("#collectDataCategoryForm");
        var formFour = document.body.querySelector("#collectDataTotalForm");

        var totalCheckbox = document.body.querySelector("#totalCheckbox");
        var date = document.body.querySelector("#date");

        var categoryContainerTwo = document.body.querySelector("#categoryContainerDataContainer");
        var personSelectorTwo = document.body.querySelector("#personSelectorDataCategory");

        var typeSelector = document.body.querySelector("#activity_or_grand");
        var personConatiner = document.body.querySelector("#personContainer");
        var activityContainer = document.body.querySelector("#activityContainer");
        
        function showPossibilitiesCategory(){
            switch(personSelectorTwo.value){
                case "ahmad/saif/boody":
                    categoryContainerTwo.innerHTML = '<select name="categoryData" form="collectDataCategoryForm"><option value="invalid" selected disabled>Choose a category!</option><option value="Food">Food</option><option value="Stationery_items">Stationery Items</option></select>';
                    break;
                case "main_expenses":
                    categoryContainerTwo.innerHTML = '<select name="categoryData" form="collectDataCategoryForm"><option value="Bread">Bread</option><option value="Medicine">Medicine</option><option value="Ahmad_Lessons">Ahmad Lessons</option><option value="Food_Orders">Food Orders</option><option value="Water_Gas_Electricity">Water/Gas/Electricity</option><option value="Telephone_Internet_15">Telephone/Internet</option><option value="Others">Others</option></select>';
                    break;
            }
            submitThree.style= "display:block;margin-left:3.75em;";
        }

        function showPossibilities(){
            switch(personSelector.value){
                case "main_expenses":
                categoryContainer.innerHTML = '<select class="sendSelects" name="category" id="categoryData" onchange="displayMath();" form="sendExpenses"><option value="invalid" selected disabled>Choose a category!</option><option value="Bread">Bread</option><option value="Medicine">Medicine</option><option value="Ahmad_Lessons">Ahmad Lessons</option><option value="Food_Orders">Food Orders</option><option value="Water_Gas_Electricity">Water/Gas/Electricity</option><option value="Telephone_Internet_15">telephone/internet</option><option value="Others">Other</option></select>';
                break;
                case "ahmad":
                categoryContainer.innerHTML = '<select class="sendSelects" name="category" id="categoryData" onchange="displayMath();" form="sendExpenses"><option value="invalid" selected disabled>Choose a category!</option><option value="Food">Food</option><option value="Stationery_items">Stationery Items</option></select>';
                break;
                case "saif":
                categoryContainer.innerHTML = '<select class="sendSelects" name="category" id="categoryData" onchange="displayMath();" form="sendExpenses"><option value="invalid" selected disabled>Choose a category!</option><option value="Food">Food</option><option value="Stationery_items">Stationery Items</option></select>';
                break;
                case "boody":
                categoryContainer.innerHTML = '<select class="sendSelects" name="category" id="categoryData" onchange="displayMath();" form="sendExpenses"><option value="invalid" selected disabled>Choose a category!</option><option value="Food">Food</option><option value="Stationery_items">Stationery Items</option></select>';
                break;
            }
        }
        function displayMath(){
            math.style.display = "block";
            submitOne.style.display = "block";
            submitOne.style.marginLeft = "43vw";
        };
        
        function validateForm(){
            mathValue = math.value;
            if(mathValue == ""){
                alert("Please enter a valid value!")
            }else{

            }
        }
        function showPossibilitiesData(){
            switch(personSelectorData.value){
                case "main_expenses":
                categoryContainerData.innerHTML = '<select name="categoryData" id="categoryData" form="collectDataForm"><option value="invalid" selected disabled>Choose a category!</option><option value="Bread">Bread</option><option value="Medicine">Medicine</option><option value="Ahmad_Lessons">Ahmad Lessons</option><option value="Food_Orders">Food Orders</option><option value="Water_Gas_Electricity">Water/Gas/Electricity</option><option value="Telephone_Internet_15">telephone/internet</option><option value="Others">Other</option></select>';
                break;
                case "ahmad":
                categoryContainerData.innerHTML = '<select name="categoryData" id="categoryData" form="collectDataForm"><option value="invalid" selected disabled>Choose a category!</option><option value="Food">Food</option><option value="Stationery_items">Stationery Items</option></select>';
                break;
                case "saif":
                categoryContainerData.innerHTML = '<select name="categoryData" id="categoryData" form="collectDataForm"><option value="invalid" selected disabled>Choose a category!</option><option value="Food">Food</option><option value="Stationery_items">Stationery Items</option></select>';
                break;
                case "boody":
                categoryContainerData.innerHTML = '<select name="categoryData" id="categoryData" form="collectDataForm"><option value="invalid" selected disabled>Choose a category!</option><option value="Food">Food</option><option value="Stationery_items">Stationery Items</option></select>';
                break;
            }
            submitTwo.style = "display:block";
        }
        function submitForm(formNum){
            formNum.submit();
            formOne.reset();
        };
        function showPersons(){
            switch(typeSelector.value){
                case "by_activity":
                    personConatiner.innerHTML = "<select id='personSelectorTotal' onchange='showActivities();' form='collectDataTotalForm' name='personSelector'><option selected disabled>Choose a person!</option><option value='ahmad'>Ahmad</option><option value='saif'>Saif</option><option value='boody'>Boody</option><option value='ahmad-saif-boody'>Ahmad/Saif/Boody</option><option value='main_expenses'>Main Expenses</option></select>";
                    break;
                case "grandTotal":
                    personContainer.innerHTML="";
                    activityContainer.innerHTML="";
                    break;
            }
            var personSelectorTotal = document.body.querySelector('#personSelectorTotal');
            submitFour.style.display="block";

        }
        function showActivities(){
            var individualCases = '<select onchange="displaySubmit();" name="totalDataActivity" form="collectDataTotalForm"><option value="invalid" selected disabled>Choose a category!</option><option value="Food">Food</option><option value="Stationery_items">Stationery Items</option></select>';
            switch(personSelectorTotal.value){
                case "ahmad-saif-boody":
                    activityContainer.innerHTML = individualCases;
                    break;
                case "ahmad":
                    activityContainer.innerHTML = individualCases;
                    break;
                case "saif":
                    activityContainer.innerHTML = individualCases;
                    break;
                case "boody":
                    activityContainer.innerHTML = individualCases;
                    break;
                case "main_expenses":
                    activityContainer.innerHTML = '<select name="totalDataActivity" form="collectDataTotalForm"><option value="Bread">Bread</option><option value="Medicine">Medicine</option><option value="Ahmad_Lessons">Ahmad Lessons</option><option value="Food_Orders">Food Orders</option><option value="Water_Gas_Electricity">Water/Gas/Electricity</option><option value="Telephone_Internet_15">Telephone/Internet</option><option value="Others">Others</option></select>';;
                    break;
            }
        }
        </script>
	</body>
	</html>