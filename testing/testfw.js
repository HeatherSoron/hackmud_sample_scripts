require = require("really-need");
const util = require('util');

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject?w=1';


var mdbproxy = {
    collection: null,
    database: null,
    result: [],
    connect: function (callback) {

        var self = this;
        // Use connect method to connect to the Server
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            self.database = db;
            // Get the documents collection
            self.collection = db.collection('documents');

            callback();
        });
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
        self.result = self.collection.find(id).limit(20);
        return {
            array: function () {
                // TBD remove hardcoded values and fix crud
                return [{k:"T1",n:"123456", pr:"abcdefg", sl:4}];
            }
        };
    },
    disconnect: function () {
        this.database.close();
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
//    console.log(patched);
    return patched;
};

module.exports.register_user_script = function (obj, alias) {

    console.log("Registering user script as " + alias);
    console.log(util.inspect(obj, { showHidden: true, depth: 2 }));

    global.zzzus[alias] = obj;
};

module.exports.testAll = function (script, testCallback) {
    var scriptalias = script.replace("./", "").replace("/", "").replace(".js", "");
    global.zzzus[scriptalias] = function (context, args) { };

    const intest = require(script, { pre: preFunction });
    
    console.log(util.inspect(intest, { showHidden: true, depth: 2 }));

    mdbproxy.connect(function () {
        var res = mdbproxy.insert({ k: "T1", n: "123456", pr: "abcdef", sl: 4 })
       
        testCallback(intest, scriptalias);

        mdbproxy.disconnect();
    });
    
}
