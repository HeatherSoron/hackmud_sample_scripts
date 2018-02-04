//This script just demonstrates how a cracker would work.
//Executing this code in-game WOULD NOT WORK!!!
function (context,args) { 
  var std = #fs.scripts.lib(); //For logging messages
  var c_1 = ["x","y","z"]; //Possibilities for lock 1
  var c_2 = ["a","b","c"]; //Possibilities for lock 2
  var c_3 = [1,2,3];       //Possibilities for lock 3
  var ret = "";            //To store the result message of a cracking attempt
  var comb = {};           //To use when target is called
  
  ret = args.target.call({});   //Initial call of target to determine first lock
  
  while (/*LOCK_ERROR present in ret*/) {
    if (/*ret contains lock 1*/) {    //Example of "simple" lock
      for (/*Length of possibilities for lock 1*/) {
        //Set neccessary args of comb for cracking attempt
        //Call target with comb (set ret to output)
        
        if (/*ret DOES NOT contain any hint on the result (lock is cracked)*/) {
          break;                //Break loop (since further attempts are not neccessary)
        }
      }
      if (/*ret contains lock 2*/) {  //Example of lock with 2 arguments
        for (/*Length of possibilites for lock 2, argument 1*/) {
          for (/*Length of possibilities for lock 2, argument 2*/) {
            //Set neccessary args of comb for cracking attempt
            //Call target with comb (set ret to output)
            
            if (/*ret DOES NOT contain any hint on any of the arguments (lock is cracked)*/) {
              break;            //Break loop (since further attempts are not neccessary)
            }
          }
        }
        //Depending on the amount of possible locks, further statements must be added
      }
    }
  }
  
  std.log(comb);                //Log final version of comb (version that fully cracked the target)
  return {ok:true,msg:std.get_log()}; //Return ok and logs
}
