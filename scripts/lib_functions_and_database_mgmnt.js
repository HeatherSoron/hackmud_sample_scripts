function (_,a) { //f:0, args:0
	// made by d3f4ult -- no rights reserved ( CC0 )
	// https://creativecommons.org/publicdomain/zero/1.0/
	const l = #fs.scripts.lib()
	const man = [
		"`AUseful scripts.lib features`",
		"`AUse` `Nf` `Ato call one of the functions listed below. Additional arguments can be passed with the `Nargs` `Aparameter.`",
		"",
		"`Vto_gc` `A- convert a raw number to a GC string <` `Cnumber` `A>`",
		"`Vfrom_gc` `A- convert a GC string to a raw number < `GC `Cstring` `A>`",
		"`Vtimestr` `A- return current date & time as a hackmud timestamp ( YYMMDD.HHMM ) < `Cnone` `A>",
		"`Vcan_exec` `A- returns true/false depending on if the script has [input] ms to execute in the given time frame. <` `C!cannot be called!` `A>`",
		"`Vsec` `A- returns the corresponding security level from an array <` `Cnumber from 0 to 4 [inclusive] ``A>",
		"",
		"`ADatabase Management`",
		"",
		"`Vall` `A- display *all* DB entries", //, assuming that hackmud doesn't cull the output
		"`Vf` `A- find an entry, then return it <``Cobject``A>`",
		"`Vr` `A- remove an entry from the DB <``Cobject``A>`",
		"`Vi` `A- insert an entry into the DB <``Cobject``A>`",
		"`Vu` `A- update *all* entries in the DB, then return updated entries <``Carray with two objects``A>`",
		"`Vu1` `A- update *one* entry in the DB <``Carray with two objects``A>`",
		"`Vus` `A- upsert entries matching query <``Carray with two objects``A>`"
		// #db.us/u/u1() accepts two objects as parameters - the first one is a query, and the latter one contains the data to insert/update.
		// upsert is insert & update one combined into a convenient package -- if the query search succeeds, it updates the first [cont. on newline]
		// entry it finds; else, create the entry with the data from the 2nd object
		// update just updates entries with the data from the second object - same as with upsert, but this updates *all* entries at once;
		// ^ useful when changing entire database structures
		
		// NOTE: ALWAYS make sure that you are querying the DB correctly! Faulty queries can trigger unexpected errors!
		// (each time that comes up, it e-mails Sean, so you *definitely* want to avoid it)
	]
	if (!a) return man 
	
	switch (a.f) {
		case "to_gc":
			 return "\n`AInput: " + a.f + "`\n" + "`AOutput: " + l.to_gc_str(a.args) + "`"
		case "from_gc":
			return "\n`AInput: " + a.f + "`\n" + "`AOutput: " + l.to_gc_num(a.args) + "`"
		case "timestr":
			return "\n`A"+l.to_game_timestr(new Date())+"`"
		case "i":
			#db.i(a.args)
			return #db.f(a.args) 
		case "f":
			return #db.f(a.args).array()
		case "r":
			#db.r(a.args)
			return "\nEntry deleted."
		case "u":
			#db.u(a.args[0], a.args[1])
			return #db.f(a.args[0]).array()
		case "u1":
			#db.u1(a.args[0], a.args[1])
			return #db.f(a.args[0]).array()
		case "us":
			#db.us(a.args[0], a.args[1])
			return #db.f(a.args[0]).array()
		default:
			return man;  
	}
}