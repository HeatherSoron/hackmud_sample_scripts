// Instructional script for cracking EZ_21 locks.
// Syntax: script {t: #s.some_user.their_loc }
// By mushin0
 
function (context, args){
    var target = args.t;                // target = #s.some_user.their_loc
    var response = target.call({});     // response = #s.some_user.their_loc.call({})
    var substring1 = "EZ_21";           // check var for lock type
    var substring2 = "UNLOCKED";        // check var for unlocked
    var i = 0;                          // counter for array
   
    // response.indexOf(substring) searches for substring within response and reports back
    // an int higher than -1 if it is found, otherwise it is -1
   
    if ( response.indexOf(substring1) > -1 ){               // check for lock type
    while ( response.indexOf(substring2) === -1 ) {         // check for unlocked
        var passwords = ["unlock","open","release"];        // init array with passwords
        var response = target.call ({EZ_21: passwords[i] });// Try passwords
        i++;                                                // increment i for array
    }}
   
    return response;
   
}
