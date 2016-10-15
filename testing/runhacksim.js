var Fiber = require('fibers');
const util = require('util');
var tester = require("./testfw")

new Fiber(function () {

    // ============= Test code goes here ==============

    tester.testAll("./d00mlaut/d00m", function (d00m, alias) {
        var d00mLib = d00m({}, {});
        tester.register_user_script(d00m, alias);

        console.log(d00mLib.protect({
            s: {
                name: "#uknown.blah", call: c001_test
            }
        }));
        console.log(d00mLib.lockname("Denied by CORE c002 lock."));
        console.log(d00mLib.lockname("Denied by CORE 'c002' lock."));
        console.log(d00mLib.lockname("Denied by CORE *c002* lock."));
        console.log(d00mLib.lockname("Denied by CORE #c002# lock."));
        console.log(d00mLib.lockname("Denied by CORE !c002! lock."));
        console.log(d00mLib.lockname("Denied by CORE `0c002` lock."));
        console.log(d00mLib.lockname("Denied by CORE `1c002` lock."));
        console.log(d00mLib.lockname("Denied by CORE `2c002` lock."));
        console.log(d00mLib.lockname("Denied by CORE `3c002` lock."));
    });

    var c001_test = function (args) {
        console.log(util.inspect(args, { showHidden: true, depth: 2 }));
        if (args) {
            if (Object.keys(args).length == 0) {
                return "+LOCK_ERROR+\nDenied access by CORE `3c001` lock;";
            } else if (args.c001) {
                if (args.c001 == "lime") {
                    if (args.color_digit) {
                        if (args.color_digit == 6) {
                            return "!LOCK_UNLOCKED!\nConnection terminated.";
                        } else {
                            return "+LOCK_ERROR+\n\"" + args.color_digit + " is not the correct color_digit code";
                        }
                    } else {
                        return "+LOCK_ERROR+\nRequired unlock parameter !color_digit! is missing";
                    }
                } else {
                    return "+LOCK_ERROR+\n\"" + args.c001 + " is not the correct c001 code";
                }
            } else {
                return "c001 param incorrect;";
            }
        } else {
            return "bad_param";
        }
    };

    tester.testAll("./d00mlaut/cracker.js", function (crackerLib) {
        crackerLib({}, {
            target: {
                name: "#uknown.blah", call: c001_test
            }
        });
    });

    // ============= End test code goes here ==============

}).run();