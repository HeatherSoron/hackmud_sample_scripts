// contributed by @junkie. Thanks!
function (context, args) { // characters:#
	//return on a failure
	if (!args){
		return {
			ok: false,
			msg: "Define how many !characters! you want to display (The list starts at 01)."
		}
	}
	//iterates through a for loop, converting the numbers to characters
	var block = "";
	for (var i = 1; i < args.characters; i++){
		// note that vanilla JS uses String, but it's recommended in hackmud to use STRING (less hackable - the reason why is an advanced topic)
		block += STRING.fromCharCode(i) + " ";
		if (i%10 == 0){
			block+="\n" + i + ": ";
		}
	}
	//returns the string along with a way to use them effectively in a script
	return {
		ok: true,
		msg: "Display characters in your scripts by assigning them to a variable:\n`2var char= STRING.fromCharCode(number)`\n"+block
	}
	

}
