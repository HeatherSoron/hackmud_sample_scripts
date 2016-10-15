var Fiber = require('fibers');
const util = require('util');
var tester = require("./testfw")

new Fiber(function () {

    // ============= Test code goes here ==============

tester.testAll("./fwtests/dbtest1", function (dbtest1, alias) {
    console.log(dbtest1({}, {}));
});

    // ============= End test code goes here ==============

}).run();