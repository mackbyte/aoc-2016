const fs = require("fs"),
    Address = require('./Address').Address;

fs.readFile("seven/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const addressList = data.split('\n'),
          addresses = addressList.map(adr => new Address(adr));

    console.log(addresses.reduce((a, b) => b.supportsTLS() ? ++a : a, 0));
});