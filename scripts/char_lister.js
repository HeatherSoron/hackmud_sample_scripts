// contributed by @junkie. Thanks!
// edited by d3f4ult for more readability
// 
function (_, a) { // characters:""
	//return on a failure
	if (!a){
		return {
			ok: false,
			msg: "Define how many !characters! you want to display (The list starts at 01)."
		}
	}
	//iterates through a for loop, converting the numbers to characters
	//note - for (let foo; foo<bar.length; foo++) syntax is less readable than a for...in loop - changed it
	var block = "";
	for (let i in a.characters) {
		block += String.fromCharCode(i) + " ";
		if (i%10 == 0){
			block+="\n" + i + ": ";
		}
	}
	//returns the string along with a way to use them effectively in a script
	return {
		ok: true,
		msg: "Display characters in your scripts by assigning them to a variable:\n`2var char= String.fromCharCode(number)`\n"+block
	}
	

}
