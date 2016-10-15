var MSServer = require("mongo-sync").Server;
var Fiber = require('fibers');
var Future = require('fibers/future'), wait = Future.wait;
require = require("really-need");

// FYI: var url = 'mongodb://localhost:27017/hackmud?w=1';

var mdbproxy = {
    collection: null,
    database: null,
    result: [],
    flag: false,
    msserver: null,
    connect: function () {

        var msserver = new MSServer("127.0.0.1");
        var msdb = msserver.db("hackmud");
        var coll = msdb.getCollection("testfw");
        this.collection = coll;
        this.database = msdb;
        this.msserver = msserver;
    },
    remove: function (id) {
        return this.collection.remove(id);
    },
    update: function (id, act) {
        return this.collection.update(id, act);
    },
    insert: function (obj) {
        return this.collection.insert(obj);
    },
    find: function (id) {
        var self = this;
        var res = self.collection.find(id);
        return {
            array: function () {                
                return res.toArray();
            }
        };
    },
    cleanup: function () {

    },
    removeCollection: function () {
        mdbproxy.collection.remove();
    },
    disconnect: function () {
        this.msserver.close();
    }
};

var logmsgs = [];

var scrproxy = {
    lib: function () {
        return {
            is_arr: function (obj) {
                return obj !== undefined && Array.isArray(obj);
            },
            get_log: function () {
                return logmsgs;
            },
            log: function (lmsg) {
                logmsgs[logmsgs.length] = lmsg;
                console.log(lmsg);
            },
            not_impl: function () {
                return { ok: false, msg: "not implemented" };
            }
        }
    },
    get_level: function (args) {
        if (args.name) {
            return 4;
        } else return {};
    }
};

global.zzzsl = scrproxy;
global.zzzdb = mdbproxy;
global.zzzus = {};

var preFunction = function (source, filename) {
    var str, patched = "/*\"use strict\";*/ module.exports=";
    str = source.replace(new RegExp("#s\.scripts", 'g'), "zzzsl");
    str = str.replace(/#s\.([^\.\s\(\{]+)\.([^\.\s\(\{]+)/g, "zzzus.$1$2");
    str = str.replace(new RegExp("#db\.u\\\(", 'g'), "zzzdb.update(");
    str = str.replace(new RegExp("#db\.r\\\(", 'g'), "zzzdb.remove(");
    str = str.replace(new RegExp("#db\.i\\\(", 'g'), "zzzdb.insert(");
    str = str.replace(new RegExp("#db\.f\\\(", 'g'), "zzzdb.find(");
    str = str.replace(new RegExp("#[^a-zA-Z0-9\.]*", 'g'), "");
    patched = patched + str;
    return patched;
};

module.exports.register_user_script = function (obj, alias) {

    console.log("Registering user script as " + alias);

    global.zzzus[alias] = obj;
};

module.exports.testAll = function (script, testCallback) {
    var scriptalias = script.replace("./", "").replace("/", "").replace(".js", "");
    global.zzzus[scriptalias] = function (context, args) { };

    console.log("=======Running test script: " + script+ "=======");
    console.log("===\tLoading script with adaptations...");
    const intest = require(script, { pre: preFunction });

    console.log("===\tConnecting to MongoDB...");
    mdbproxy.connect();
    console.log("===\tRunning the test code:");
    try {
        testCallback(intest, scriptalias);
        console.log("=OK\tClean exit from test code!");
    } catch (e) {
        console.log("ERR\tException occurred in test code: " + e);
    } finally {
        console.log("===\tCleaning up MongoDB");
        mdbproxy.removeCollection();
        mdbproxy.disconnect();
    }

}
