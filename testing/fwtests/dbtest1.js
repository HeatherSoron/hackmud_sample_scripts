function(context, args) {

    var k = "akey";
    var o = { obj:"obj" };

    var i = #db.i({ k: k, o: o });

    var o2 = #db.f({ k: k }).array();
    console.log(o2);
    return o2[0];
}
