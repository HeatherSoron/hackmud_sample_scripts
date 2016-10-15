function(context, args) { // r:"lockname, protect",a:{}
    var l = #s.scripts.lib();
    var slnames = l.security_level_names;
    var rs = {
      lockname:function (msg) {
          var x=/[A-Z_0-9] (`[0-9]|[+!-])?([A-Za-z_0-9]{4,5})(`|[+!-])? lock/;
          var r = x.exec(msg);
          if(r != null) {
              if(r.length > 1) {
                  return r[2];
              }
          }
          return null;
      },
      protect: function (args) {
          if (args.sl === undefined) args.sl = 4;
          for (let i in args) {
              if (args[i].call) {
                  if (#s.scripts.get_level({ name: args[i].name }) != args.sl) {
                      throw { ok: false, msg: "insecure target" };
                  }
              }
          }
      } // , add other functions here
 };

  // invoke library with d00m {r:"func",a:{ params }}
    if(args && args.r && args.a) return (rs[args.r])(args.a);
    var ss = "#s.you.d00m";
    var ts = [];
    var i = 0;
    for(var t in rs) { ts[i++]=ss + "." + t; }

    rs.installed = ts;
    return rs;

}
