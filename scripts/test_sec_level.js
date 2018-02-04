function (_, args) {
	// if you're running out of characters, you COULD delete this if block, to save on character count. You lose a help message, but it drops the script to below 500 (counted) characters.
	if (!args || !args.target) {
		return {
			ok: false,
			msg: "Call me with {target:#s.some.script} as the arguments (for 'some.script' that exists, such as accts.balance)"
		}
	}

	var target = args.target;
	// scripts.get_level returns a number inside scripts, or a string like 'FULLSEC' or 'MIDSEC' on command line
	var sec_level = #fs.scripts.get_level({name:target.name});
	
	var l = #fs.scripts.lib();
	
	// is it less than FULLSEC? if so, warn the user
	if (sec_level < 4 && !args.override) {
		var sec_level_name = l.security_level_names[sec_level];
		return {
			ok: false,
			msg: "The script you have passed is " + sec_level_name + ". Are you sure you want to continue? If so, pass override:true"
		};
	}
	
	var result = target.call(args.passthru);
	
	return {
		ok: true,
		msg: "Target called. See 'debug' below to inspect the output.",
		debug: result,
	}
}
