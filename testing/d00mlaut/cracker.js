function(context, args) // target:
{
    var d00m =#s.d00mlaut.d00m();
    var l = #s.scripts.lib();
    var checkstring = "LOCK_UNLOCKED";
    var obj = {};
    var lk = "Done";

    d00m.protect(args);

    do {
        var basic = args.target.call(obj);
        lk = d00m.lockname(basic);
        l.log("Found " + lk + " in " + basic);
        if (lk == "c001") {
            // ... crack c001
            return l.not_impl();
        } else {
            // unhandled;
            return { ok: false, target: args.target.name, args: obj, log: l.get_log() };
        }
    }
    while (basic.indexOf(checkstring) == -1);

    return { ok: true, target: args.target.name, args:obj, log: l.get_log() };
}
