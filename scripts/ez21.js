// Instructional script for cracking EZ_21 locks.
// Syntax: user.ez21 {t:#s.some_user.their_loc}
// By mushin0
// edited by zeta
 
function (context, args){
    var target = args.t, response = target.call({}), passwords = ["unlock","open","release"]
 
    /* target = #s.some.loc
     * response = #s.some.loc.call({})
     *
     * IMPORTANT DIFFERENCE BETWEEN #s AND #Xs:
     * #s.some.script is only usable through the CLI, and is an object.
     * #Xs.some.script is only usable in scripts, and is a function call. X can be: 4/f (fullsec), 3/h (highsec), 2/m (midsec), 1/l (lowsec), 0/n (nullsec)
     *
     * passwords is an array containing every possible solution for the EZ_21 lock
     *
     */
   
    // response.includes() checks if the said variable or literal, in this case response, includes a certain variable or literal.
    // true if it includes it, false if not
  
   
    if ( response.includes("EZ_21") ) {                            // we check if the first lock is EZ_21. if it is, we get to cracking it
        for ( var i = 0; i < passwords.length; i++ ) {             // we use a for loop, which runs once for each element in the array "passwords"
            response = target.call ({EZ_21: passwords[i] });       // we update the variable "response" with the output we get after trying the first password
            if ( response.includes("`NLOCK_UNLOCKED` EZ_21") ) {   // we check if the output contains the LOCK_UNLOCKED message of the EZ_21 lock
                break;                                             // if it does include it, we break out of the loop. if it doesnt, we try the next password
            }
        }
    }
   
    return response; //we return the output of the loc call
   
}
