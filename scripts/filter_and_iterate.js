// created by @ciastex in hackmud
// see the thoretical part in https://docs.google.com/document/d/1cNms-T_KSFy0F5j1xHXrUZEGd7AM49QEork3KlpGqkc
// -------------

function(context, args) {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    var output = "";
        
    var l = #s.scripts.lib()
       
    if(l.is_def(args.func)) {
        // could've use switch here, but well, f-- it
        if(args.func == "each") {
            // l.each(collection, callback) -- executes the callback on each item inside the collection
            l.each(nums, function(key, value) {
                // assign currently processed key and value pair to the output 
                output += ("index " + key " = " + value + "\n")
                
                return {ok:true, msg:output}
            })
        }
        
        if(args.func == "select") {
            // l.select(collection, predicate) -- executes the predicate on each and adds the currently
            //                                    processed item to the returned collection if it's true
            var selections = []
            if(l.is_num(args.divisor)) {
                selections = l.select(nums, function(key, value) {
                    // select all the values that can be divided by the divisor
                    if(value % args.divisor == 0)
                        return true;
                    else return false;
                })
                
                return {ok:true, msg:l.dump(selection)}
            } else {
                return {ok:false, msg:"Provide a `2divisor`, please."}
            }
        }
        
        if(args.func == "count") {
            // l.count(collection, predicate) -- executes the predicate on each item and 
            //                                   increments the returned value by one if it's true
            var count = 0;
            
            if(l.is_num(args.divisor)) {
                count = l.select(nums, function(key, value) {
                    // increments the count once it encounters a number divisible by the divisor
                    if(value % args.divisor == 0)
                        return true;
                    else return false;
                }
                
                return {ok:true, msg:"There are " + count + "numbers divisible by " + args.divisor}
            } else {
                return {ok:false, msg:"Provide a `2divisor`, please."}
            }
        }
        
        if(args.func == "select_one") {
            // l.select_one(collection, predicate) -- executes the predicate on each item and
            //                                        returns the FIRST value encountered.
            var value = -1;
            if(l.is_num(args.divisor)) {
                val = l.select_one(nums, function(key, value) {
                    if(value % args.divisor == 0) {
                        return true;
                    } else return false;
                })
                
                if(value == -1) {
                    return {ok:false, msg:"No numbers are divisible by this divisor."}
                } else {
                    return {ok:true, msg:"The first number in the collection divisble by " + args.divisor + " is " + value}
                }
            } else {
                return {ok:false, msg:"Please provide a `2number`, please."}
            }
        }
        
        if(args.func == "map") {
            // l.map(collection, callback) -- executes the callback on each item,
            //                                creates its own internal array and 
            //                                adds modified values to it, at the
            //                                same indexes as the original value
            var arr = []
            if(l.is_num(args.multiplier)) {
                arr = l.map(nums, function(key, value) {
                    return value * args.multiplier;
                })
                
                return {ok:true, msg:l.dump(arr)}
            } else {
                return {ok:false, msg:"Please provide a `2multiplier` please."}
            }
        }
    } else {
        return {ok:false, msg:"Usage: fai <each|select|count|select_one|map>"}
    }
}