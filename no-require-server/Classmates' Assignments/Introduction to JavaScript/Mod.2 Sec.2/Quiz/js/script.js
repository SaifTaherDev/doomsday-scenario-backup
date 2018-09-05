function quiz(id) {
	// body...
	//var result = document.getElementById('result');
	switch (id){
		case 'hat':
			document.getElementById("result").innerHTML = "La réponse est correcte!";
			break;
		case 'scarf':
			document.getElementById("result").innerHTML = "La réponse est incorrecte, ceci dans une écharpe";
			break;
		case 'glasses':
			document.getElementById("result").innerHTML = "La réponse est incorrecte, ces sont des lunettes";
			break;
		default:
			document.getElementById("result").innerHTML = "Erreur!"
	}
} 
