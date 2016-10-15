# What is this?

This is an out of game testing framework for hackmud scripts.
You can run this code outside of Visual Studio with a node command line, but
you can also step through in Visual Studio.

It uses the really-need module which allows node modules to be loaded and then
preprocessed before being handed to node. This library uses that to replace
references to scriptors in hackmud and to hook in the standard hackmud library
functions, like #s.scripts.lib.get_log().

It also mocks some #db operations, which is the reason for all the Fiber usage,
without Fibers, it's not possible to run synchronous database operations against
MongoDB like hackmud. This is done courtesy of the mongo-sync package.

# What do you need?
You need nodejs 4.0.0 because really-need preprocesses hackmud scripts,
and seems to currently only work with that version of node. Optionally, you need
Visual Studio for debugging.

# Installing software  
Visual Studio Community 2015 R3 works well, with the node tools installed.

We also wrap the database functions, so install MongoDB.

~~~~
mkdir dbdata
mongod.exe --dbpath ./dbdata
~~~~

(or run `mongod.bat`)

To prepare npm modules, use the command line

~~~~
SET PATH=C:\NODE-4.0.0;%PATH%
npm update
~~~~

=======

# Importing hackmud scripts
You need to place your user scripts in a place the framework can see. If you can
create a link, then you can edit in place.
Use your favorite tool - mklink, or junction, to link.
Or just copy the files, but that's a lot of copying to/from hackmud.

Run `#dir` in hackmud to get your user script path.
Then create a new child dir here to host them.

# Writing tests
Tests are in `runhacksim.js`, which is also the startup script

## Example Test
~~~~
var tester = require("./testfw")
tester.testAll("./(username)/cracker.js", function (crackerLib) {
    crackerLib({}, {
        target: {
            name: "#uknown.blah", call: function() { /*t1 sim*/ }
        }
    });
});
~~~~

## Running the test

`node --use-strict runhacksim.js`

(or F5 in Visual Studio)

# Libraries needed (not distributed, use NPM)

really-need
mongo-sync
mongodb
mongodb-core
fibers

##Indirect
bson
check-more-types
common-utils
core-util-is
inherits
isarray
kerberos
lazy-ass
minimist
mkdirp
nan
readable-stream
rimraf
string_decoder

# VS Install sheet

Microsoft Visual Studio Community 2015
Version 14.0.25424.00 Update 3
Microsoft .NET Framework
Version 4.6.01586

Installed Version: Community

GitHub.VisualStudio   1.0
JavaScript Language Service   2.0
JavaScript Project System   2.0
Node.js Tools   1.2.40726.00
Node.js Tools - Profiling   1.2.40726.00
TypeScript   1.8.35.0
TypeScript tools for Visual Studio

# License

This project is hereby dedicated to the public domain.

If that doesn't work in your jurisdiction, you may also use it under the terms of CC0 (https://creativecommons.org/publicdomain/zero/1.0/), or the Unlicense (http://unlicense.org/).

Basically, I don't want copyright to mess with my enjoyment of the game :).
