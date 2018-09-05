function guess() {
	// body...
	var randomNumber = Math.round(Math.random() * 10);
	var number = document.querySelector("#number").value;
	var result = document.getElementById('randomNumber');
	if (randomNumber==number){
		result.value = "Correct!";
	} else if (randomNumber>number){
		result.value = "too small!";
	} else if (randomNumber<number) {
		result.value = "too big!";
	} else {
		result.value = "Error *_*";
	}
}