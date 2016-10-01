function (context, args) { // test_script1 {}
	
	var l = #s.scripts.lib();
	
	var caller = context.caller;
	var bal = #s.accts.balance();
	
	return {
		ok: true,
		current_bal: bal,
		username: caller,
		msg: "Ran."
	};
	
}