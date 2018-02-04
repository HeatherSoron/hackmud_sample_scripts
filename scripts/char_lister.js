// contributed by @junkie. Thanks!
function (context, args) { // characters:#
	//return on a failure
	if (!args){
		return{
			ok: false,
			msg: "Define how many `Ncharacters` you want to display (The list starts at 01)."
		}
	}
	//iterates through a for loop, converting the numbers to characters
	var block = "";
	for (var i = 1; i < args.characters; i++){
		block += String.fromCharCode(i) + " ";
		if (i%10 == 0){
			block+="\n" + i + ": ";
		}
	}
	//returns the string along with a way to use them effectively in a script
	return{
		ok: true,
		msg: "Display characters in your scripts by assigning them to a variable:\n`2var char= String.fromCharCode(number)`\n"+block
	}
	

}
