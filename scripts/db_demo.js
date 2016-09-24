// This script demonstrates some basic DB usage, in a self-contained manner.
// This is somewhat advanced, and you probably want to figure out basic scripts first.
// Or, you can just dive into the deep end.
//
// *** SEE ALSO *** the MongoDB documentation for 'find' and 'update'
function(context, args) {
	// set up a place to store all the intermediate steps, before we display them to ourselves at the end
	var results = {};
	
	// if we have nothing in our DB, this will be kind of boring. So, let's add some entries.
	#db.i({
		_DEMO_DELETEME_: true,
		demo_context: context
	});
	#db.i({
		_DEMO_DELETEME_: true,
		demo_args: args
	});

	
	// let's first grab ONE entry (maybe an existing one, if any) where 'demo_context' exists
	results['context'] = #db.f({demo_context: {$exists: true}}).first();
	// and, all entries where _DEMO_DELETEME_ is set to true
	results['all'] = #db.f({_DEMO_DELETEME_: true}).array();

	// run an update on all relevant entries in our DB. $inc is one of the update functions that MongoDB provides; you might also want $set, or others
	#db.u({_DEMO_DELETEME_: true}, {$inc: {update_count: 1}});
	results['after_all_update'] = #db.f({_DEMO_DELETEME_: true}).array();

	// now we'll update *only one* of the entries, and see what happens
	#db.u1({_DEMO_DELETEME_: true}, {$inc: {update_count: 1}});
	results['after_single_update'] = #db.f({_DEMO_DELETEME_: true}).array();
	
	// clean up after ourselves. WARNING: if you have any *other* entries matching this filter, they'll be wiped away, too.
	#db.r({_DEMO_DELETEME_: true});

	// and now we display the results
	return results;
}
