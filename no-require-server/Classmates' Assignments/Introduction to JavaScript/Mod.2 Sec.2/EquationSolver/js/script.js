function roots() {
	var a = document.querySelector("#a").value;
	var b = document.querySelector("#b").value;
	var c = document.querySelector("#c").value;
	var dec = document.querySelector("#dec").value;
	var delta = Math.pow(b,2)-(4*a*c);
	var result1 = document.getElementById('result1');
	var result2 = document.getElementById('result2');

	if(delta>0){
		var r1ex= (-b+Math.sqrt(delta))/(2*a);
		var r2ex= (-b-Math.sqrt(delta))/(2*a);
		var r1 = r1ex.toFixed(dec);
		var r2 = r2ex.toFixed(dec);
		console.log("The first root is "+ r1 + " and the second root is "+ r2);
		result1.value = "The first root is "+ r1;
		result2.value = "The second root is "+ r2;
		} else if (delta==0) {
		var rex= (-b/(2*a));
		var r = rex.toFixed(dec);
		console.log("The double root is"+ r);
		result1.value = "The double root is"+ r;
		result2.value = "";
	} else if (delta<0) {
		var rex = (-b/(2*a));
		var r = rex.toFixed(dec);
		var iex = Math.sqrt(-delta)/(2*a);
		var i = iex.toFixed(dec);
		console.log("Imaginary roots!");
		result1.value = "The first root is "+ r + "+"+ i + "i";
		result2.value = "The second root is"+ r + "-"+ i + "i";
	} else {
		result1.value = "Nothing to do";
		result2.value = "";
	}
}