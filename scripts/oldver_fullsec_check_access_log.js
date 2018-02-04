// made by Zuris.
// the original is reportedly available as `diag.log_analyzer`.
// this script checks sys.access_log only, in a way that's verifiable - so if you check scripts.get_level on this before running it, you'll know for sure that it doesn't touch your upgrades.
function(_, args){ // { script }
    if ((args === null) || (typeof args.script === 'undefined')) {
        return {ok:false, msg:"Please call this script with {script:#s.sys.access_log} to allow access to your logs"};
    }
    var logfile = args.script.call();

    var npc_prefix = ['abndnd', 'uknown', 'unknown', 'derelict', 'anonymous', 'unidentified', 'anon'];
    var insert;
    var logs = [];

    logfile.map(function(val, index) {
        insert = true;
        for (var i = 0; i < npc_prefix.length; i++) {
            if (val.indexOf(npc_prefix[i]) > -1) {
                insert = false;
            }
        }
        
        if (insert) {
            logs.push(val);
        }
    });

    return logs;
}
// made by Zuris
