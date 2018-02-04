// this script hooks into a player-provided utility to track the number of calls
function(context, args) {

	// we'll wrap the analytics in a try-catch, so that a failure during recording doesn't break the rest of the script
	try {
		// Basic usage. see dtr.man{page:"soron.arch_data"} for additional usage. Also, there's ada.haxfax floating around, which has a semi-compatible API.
		#fs.soron.arch_data({log:{c:context}});
	} catch (e) {
		// oh well, we can live with this. Congrats, user-who-is-not-tracked!
	}


	// I guess we should do something other than just record our usage, right? Ah, I know! Let's display our usage, and the usage of whatever script called us (if any).
	return {
		// the query:"foo.bar" version is also shown, formatted, on dtr.man pages.
		my_usage: #fs.soron.arch_data({query: context.this_script}),
		calling_usage: #fs.soron.arch_data({query: context.calling_script}),
		// these next two are formatted better when called on the command line. Try them there! soron.arch_data{rankings:"cli"}, for example
		global_cli_usage: #fs.soron.arch_data({rankings:"cli"}),
		global_lib_usage: #fs.soron.arch_data({rankings:"lib"}),
	}
}
