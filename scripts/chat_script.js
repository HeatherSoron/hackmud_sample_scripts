function (context, args) { // ch:"", msg:""
	// we want to color our text, using soron.color_utils. Run that script on command line to set up your chat color
	var text = #fs.soron.color_utils({colorize: args.msg});
	
	// Now we send a chats.send, using our slightly-modified arguments
	var result = #fs.chats.send({ channel:args.ch, msg:text });
	
	// and, we return the result. It will probably be an object that looks like { ok: true }
	return result;
}
